const express = require('express');
const router = express.Router();
const User = require('../Config/Models/users'); // ✅ 

// GET all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
    console.log("user fetched successfully:", users); // log fetched users
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET one user by ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    console.log('Fetched user:', user); // log the fetched user
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
    
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST - Add new user

router.post('/', async (req, res) => {
  try {
    console.log(' New user registration request received:', req.body); //  log incoming data

    const { fullName, email, phoneNumber, password } = req.body;

    const user = new User({
      fullName,
      email,
      phoneNumber,
      password
    });

    console.log(' Creating new user document...'); // log before saving
    const newUser = await user.save();

    console.log(' User successfully saved to database:', newUser); // log success
    res.status(201).json(newUser);

  } catch (err) {
    console.error('Error creating user:', err.message); //  log any errors
    res.status(400).json({ message: err.message });
  }
});

// DELETE a user by ID

router.delete('/:id', async (req, res) => {
  try {
    console.log('Delete request received for user ID:', req.params.id); // log incoming ID

    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      console.log(' No user found with ID:', req.params.id); //  log if not found
      return res.status(404).json({ message: 'User not found' });
    }

    console.log(' User successfully deleted:', user.fullName || user._id); // log success
    res.json({ message: 'User deleted successfully' });

  } catch (err) {
    console.error('Error deleting user:', err.message); // log any errors
    res.status(500).json({ message: err.message });
  }
});


// UPDATE user by ID

router.put('/:id', async (req, res) => {
  try {
    console.log(' Update request received for user ID:', req.params.id); // log the target ID
    console.log(' Data to update:', req.body); // log incoming data

    const { fullName, email, phoneNumber, password } = req.body;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { fullName, email, phoneNumber, password },
      { new: true, runValidators: true }
    );

    if (!user) {
      console.log(' No user found with ID:', req.params.id); //  log not found
      return res.status(404).json({ message: 'User not found' });
    }

    console.log(' User successfully updated:', user); // log the updated user
    res.json(user);

  } catch (err) {
    console.error(' Error updating user:', err.message); //  log error
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
