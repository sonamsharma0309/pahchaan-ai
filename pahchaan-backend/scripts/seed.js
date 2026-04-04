require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const connectDB = require('../config/db');

const seed = async () => {
  await connectDB();

  // Clean existing
  await User.deleteMany({});
  console.log('🗑️  Cleared existing users');

  // Create admin
  await User.create({
    name: 'Pahchaan Admin',
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD,
    isAdmin: true,
    plan: 'pro',
  });
  console.log('✅ Admin user created');

  // Create test user
  await User.create({
    name: 'Test User',
    email: 'test@pahchaan.ai',
    password: 'Test@123456',
    plan: 'starter',
  });
  console.log('✅ Test user created');

  console.log('🌱 Seed complete!');
  process.exit(0);
};

seed().catch((err) => {
  console.error('❌ Seed failed:', err);
  process.exit(1);
});