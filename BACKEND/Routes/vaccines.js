const express = require('express');
const router = express.Router();
const Vaccine = require('../Config/Models/vaccine'); 

// GET all vaccines
router.get('/', async (req, res) => {
  try {
    const vaccines = await Vaccine.find();
    res.json(vaccines);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET vaccine by ID
router.get('/:id', async (req, res) => {
  try {
    console.log(' Request received to fetch vaccine with ID:', req.params.id); // log the incoming ID

    const vaccine = await Vaccine.findById(req.params.id);

    if (!vaccine) {
      console.log(' Vaccine not found for ID:', req.params.id); //log if no match found
      return res.status(404).json({ message: 'Vaccine not found' });
    }

    console.log(' Vaccine found:', vaccine); // log the found document
    res.json(vaccine);
  } catch (err) {
    console.error(' Error fetching vaccine:', err.message); // log any error that occurs
    res.status(500).json({ message: err.message });
  }
});


// POST - Add new vaccine
router.post('/', async (req, res) => {
  try {
    const { name, purpose, recommendedAge } = req.body;

    const vaccine = new Vaccine({
      name,
      purpose,
      recommendedAge
    });

    const newVaccine = await vaccine.save();
    res.status(201).json(newVaccine);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT - Update vaccine by ID
router.put('/:id', async (req, res) => {
  try {
    const { name, purpose, recommendedAge } = req.body;
    const vaccine = await Vaccine.findByIdAndUpdate(
      req.params.id,
      { name, purpose, recommendedAge },
      { new: true, runValidators: true }
    );

    if (!vaccine) return res.status(404).json({ message: 'Vaccine not found' });
    res.json(vaccine);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//  DELETE vaccine by ID
router.delete('/:id', async (req, res) => {
  try {
    const vaccine = await Vaccine.findByIdAndDelete(req.params.id);
    if (!vaccine) return res.status(404).json({ message: 'Vaccine not found' });
    res.json({ message: 'Vaccine deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
