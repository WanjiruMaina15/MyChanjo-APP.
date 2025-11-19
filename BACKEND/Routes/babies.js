const express = require('express');
const router = express.Router();
const Baby = require('../Config/Models/baby');
const Vaccine = require('../Config/Models/vaccine');


const parseRecommendedAge = (ageString) => {
  if (!ageString) return 0;

  const lower = ageString.toLowerCase().trim();

  if (lower.includes('birth')) return 0;
  if (lower.includes('week')) {
    const weeks = parseFloat(lower.replace(/[^\d.]/g, '')) || 0;
    return weeks / 4.345; 
  }
  if (lower.includes('month')) {
    const months = parseFloat(lower.replace(/[^\d.]/g, '')) || 0;
    return months;
  }
  if (lower.includes('year')) {
    const years = parseFloat(lower.replace(/[^\d.]/g, '')) || 0;
    return years * 12;
  }

  return 0; 
};


const addMonthsToDate = (startDate, months) => {
  const newDate = new Date(startDate);
  newDate.setMonth(newDate.getMonth() + months);
  return newDate;
};



router.get("/user/:userId", async (req, res) => {
  try {
 
    const babies = await Baby.find({ clerkUserId: req.params.userId }).populate('vaccineSchedule.vaccineId');
    
   
    if (!babies || babies.length === 0) {
        return res.status(200).json({ babies: [] });
    }

    res.status(200).json({babies});
  } catch (error) {
    
    console.error("Error fetching babies for user:", error.message); 
    res.status(500).json({ message: "Server error: Could not fetch babies." });
  }
});



router.post('/', async (req, res) => {
  
  const { name, dateOfBirth, clerkUserId } = req.body; 

  if (!name || !dateOfBirth || !clerkUserId) { 
    return res.status(400).json({ message: "Baby details and parent ID are required." });
  }

  try {
    const generalSchedule = await Vaccine.find({});
    const birthDate = new Date(dateOfBirth);

    const personalizedSchedule = generalSchedule.map((template) => {
      const monthsToAdd = parseRecommendedAge(template.recommendedAge);
      const dueDate = addMonthsToDate(birthDate, monthsToAdd);

      return {
        name: template.name,
        date: dueDate,
        status: 'pending',
        vaccineId: template._id,
        purpose: template.purpose,
        recommendedAge: template.recommendedAge
      };
    });

   
    const newBaby = new Baby({
      
      clerkUserId: clerkUserId, 
      name,
      dateOfBirth: birthDate,
      vaccineSchedule: personalizedSchedule,
    });

    await newBaby.save();

    return res.status(201).json({
      message: 'Baby registered and schedule generated successfully',
      baby: newBaby,
    });
  } catch (error) {
    console.error('Error creating baby and schedule:', error.message);
    res.status(500).json({ message: 'Server error: Failed to generate schedule.' });
  }
});
router.put('/vaccine/:scheduleId', async (req, res) => {
  const { status } = req.body;
  const scheduleId = req.params.scheduleId;

  if (!['pending', 'completed', 'missed', 'overdue'].includes(status)) {
    return res.status(400).json({ message: "Invalid status value" });
  }

  try {
   
    const updatedBaby = await Baby.findOneAndUpdate(
      { "vaccineSchedule._id": scheduleId },
      { 
        $set: { 
          "vaccineSchedule.$.status": status 
        } 
      },
      { new: true } 
    );

    if (!updatedBaby) {
      return res.status(404).json({ message: "Schedule item not found" });
    }

    res.json({ message: "Status updated", baby: updatedBaby });
  } catch (err) {
    console.error("Error updating schedule:", err);
    res.status(500).json({ message: "Server error" });
  }
});



module.exports = router;