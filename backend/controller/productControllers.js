const Product = require("../models/Product");

const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    return res.status(200).send(products);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: error });
  }
};

const getProductById = async (req, res) => {
  const {id} =req.params;
  try {
    const product = await Product.findById(id);

    return res.status(200).send(product);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: error });
  }
};

module.exports = {
  getProducts,
  getProductById,
};
