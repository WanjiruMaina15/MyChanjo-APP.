const express = require('express');
const router = express.Router();
const Baby = require('../Config/Models/baby');
const Vaccine = require('../Config/Models/vaccine');

/**
 * Helper: Convert recommendedAge string (e.g. "At birth", "6 weeks", "9 months")
 * into a numeric value (in months) for calculation.
 */
const parseRecommendedAge = (ageString) => {
  if (!ageString) return 0;

  const lower = ageString.toLowerCase().trim();

  if (lower.includes('birth')) return 0;
  if (lower.includes('week')) {
    const weeks = parseFloat(lower.replace(/[^\d.]/g, '')) || 0;
    return weeks / 4.345; // 1 month ≈ 4.345 weeks
  }
  if (lower.includes('month')) {
    const months = parseFloat(lower.replace(/[^\d.]/g, '')) || 0;
    return months;
  }
  if (lower.includes('year')) {
    const years = parseFloat(lower.replace(/[^\d.]/g, '')) || 0;
    return years * 12;
  }

  return 0; // Default if text not recognized
};

/**
 * Helper: Add months to a date accurately
 */
const addMonthsToDate = (startDate, months) => {
  const newDate = new Date(startDate);
  newDate.setMonth(newDate.getMonth() + months);
  return newDate;
};


// GET /api/babies — fetch all babies (or one baby if needed)
router.get('/', async (req, res) => {
  try {
    const babies = await Baby.find().populate('vaccineSchedule.vaccineId');
    res.status(200).json({ success: true, babies });
  } catch (error) {
    console.error('Error fetching babies:', error.message);
    res.status(500).json({ message: 'Server error: Could not fetch babies.' });
  }
});

// POST /api/babies — create baby and generate personalized schedule
router.post('/', async (req, res) => {
  const userId = req.user ? req.user.id : 'MOCK_USER_ID_123';
  const { name, dateOfBirth } = req.body;

  if (!name || !dateOfBirth) {
    return res.status(400).json({ message: "Baby's name and dateOfBirth are required." });
  }

  try {
    const generalSchedule = await Vaccine.find({});
    const birthDate = new Date(dateOfBirth);

    // Generate vaccine schedule using parsed string-based ages
    const personalizedSchedule = generalSchedule.map((template) => {
      const monthsToAdd = parseRecommendedAge(template.recommendedAge);
      const dueDate = addMonthsToDate(birthDate, monthsToAdd);

      return {
        name: template.name,
        date: dueDate,
        status: 'pending',
        vaccineId: template._id,
      };
    });

    const newBaby = new Baby({
      user: userId,
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

module.exports = router;
