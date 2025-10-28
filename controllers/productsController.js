const Product = require('../models/productModel');
const customAPIError = require('../errors/customError');

const createProduct = async (req, res) => {
  console.log(req.body);
  const product = await Product.create(req.body);
  res.status(200).json({ status: 'success', data: product });
};

const getAllProduct = async (req, res) => {
  const products = await Product.find({});
  res.status(200).json({ status: 'success', data: products });
};

const getProduct = async (req, res) => {
  res.status(200).json({ status: 'success', message: 'Get product' });
};

module.exports = { createProduct, getAllProduct, getProduct };
