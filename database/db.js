const mongoose = require('mongoose');

const connectDB = () => {
  return mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('Connected to database successfully');
  }).catch((err) => {
    console.log('Error connecting to database:', err);
  });
}

module.exports = connectDB;