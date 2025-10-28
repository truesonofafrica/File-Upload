const express = require('express');

const router = express.Router();

const {
  createProduct,
  getAllProduct,
  getProduct,
} = require('../controllers/productsController');

const uploadProductImage = require('../controllers/uploadsController');

router.route('/').post(createProduct).get(getAllProduct);
router.post('/upload-image', uploadProductImage);
router.get('/:id', getProduct);

module.exports = router;
