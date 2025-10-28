const path = require('path');
const customAPIError = require('../errors/customError');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');

const uploadProductImageLocal = async (req, res) => {
  //check if file exist
  if (!req.files) throw new customAPIError('No file uploaded', 404);

  console.log(req.files);
  const productImage = req.files.image;

  //check formats
  if (!productImage.mimetype.startsWith('image'))
    throw new customAPIError('Please upload an image', 404);

  //check file size
  const maxSize = 1024 * 1024;
  if (productImage.size > maxSize)
    throw new customAPIError('Please upload image smaller than 1MB', 404);
  const imagePath = path.join(
    '__dirname',
    '../uploadedImages/' + `${productImage.name}`
  );

  await productImage.mv(imagePath);
  return res
    .status(200)
    .json({ image: { src: `/uploadedImages/${productImage.name}` } });
};

const uploadProductImage = async (req, res) => {
  const results = await cloudinary.uploader.upload(
    req.files.image.tempFilePath,
    {
      use_filename: true,
      folder: 'file-upload',
    }
  );
  fs.unlinkSync(req.files.image.tempFilePath); // this removes the file which is stored on our server
  res.status(200).json({ image: { src: results.secure_url } });
};
module.exports = uploadProductImage;
