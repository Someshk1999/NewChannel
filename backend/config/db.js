const mongoose = require('mongoose');
const News = require('../models/News');

const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/news-channel';

  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  console.log('Connected to MongoDB');

  const count = await News.countDocuments();

};

module.exports = connectDB;
