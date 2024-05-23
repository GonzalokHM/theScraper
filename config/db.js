require('dotenv').config();

const mongoose = require('mongoose');
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.URI);
    console.log('connected to BD 👌');
  } catch (error) {
    console.log('Not connected to DB ❌');
  }
};

module.exports = {connectDB}