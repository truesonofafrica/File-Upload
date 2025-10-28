require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const app = express();

const productRoute = require('./routes/productRoute');
const errorHandlerMiddleware = require('./middleware/errorHandler');

const fileUpload = require('express-fileupload');
const cloudinary = require('cloudinary').v2;

app.use(express.json());
app.use(fileUpload({ useTempFiles: true }));
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});
app.use('/api/v1/products', productRoute);
app.use(errorHandlerMiddleware);

app.all('*splat', (req, res) => {
  res.status(404).json({ status: 'fail', message: 'Route not found' });
});

const port = process.env.PORT || 5000;

const startServer = async () => {
  try {
    const DB = process.env.MONGODB_URL.replace(
      '<<Password>>',
      process.env.MONGO_PASSWORD
    );

    await mongoose.connect(DB).then(() => console.log('Database connected'));

    app.listen(port, () => {
      console.log(`Server has started on port ${port}...`);
    });
  } catch (error) {
    console.log(error.message);
  }
};

startServer();
