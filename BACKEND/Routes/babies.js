const express = require('express');
const router = express.Router();
const Baby = require('../Config/Models/baby');

// GET all babies
router.get('/', async (req, res) => {
  try {
    const babies = await Baby.find();
    res.json(babies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//  GET baby by ID
router.get('/:id', async (req, res) => {
  try {
    const baby = await Baby.findById(req.params.id);
    if (!baby) return res.status(404).json({ message: 'Baby not found' });
    res.json(baby);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//  POST - Add new baby
router.post('/', async (req, res) => {
  try {
    const { name, yearOfBirth, parentName } = req.body; 

    // create new baby document
    const baby = new Baby({
      name,
      yearOfBirth,
      parentName
    });

    // save to database
    const newBaby = await baby.save();
    res.status(201).json(newBaby);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE baby by ID
router.delete('/:id', async (req, res) => {
  try {
    const baby = await Baby.findByIdAndDelete(req.params.id); 
    if (!baby) return res.status(404).json({ message: 'Baby not found' });
    res.json({ message: 'Baby deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//  UPDATE baby by ID
router.put('/:id', async (req, res) => {
  try {
    const { name, yearOfBirth, parentName } = req.body;

    const baby = await Baby.findByIdAndUpdate(
      req.params.id,
      { name, yearOfBirth, parentName },
      { new: true, runValidators: true }
    );

    if (!baby) return res.status(404).json({ message: 'Baby not found' });
    res.json(baby);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
