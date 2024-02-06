// createAdmin.js

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const db = require('./config/database').mongoURI;
// Connect to MongoDB
mongoose.connect(db);

// Pre-create admin user
const preCreateAdmin = async () => {
  try {
    const hashedPassword = await bcrypt.hash('Admin@2024', 10);
    const admin = new User({
      fname: 'Admin',
      lname: 'User',
      email: 'admin@stayease.com',
      password: hashedPassword,
      role: 'admin',
    });
    await admin.save();
    console.log('Admin created successfully');
  } catch (error) {
    console.error('Error creating admin:', error.message);
  } finally {
    mongoose.disconnect();
  }
};

preCreateAdmin();
