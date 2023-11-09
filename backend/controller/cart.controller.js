const Cart = require('../models/Cart')

const getCartProducts = async (req, res) => {
  try {
    const carts = await Cart.find({userId: req.user._id}).populate('productId')
    return res.status(200).send({status: 200, carts})
  } catch (err) {
    console.log(err)
    sendResponseError(500, `Error ${err}`, res)
  }
}

const addProductInCart = async (req, res) => {
  const {productId, count} = req.body
  try {
    const cart = await Cart.findOneAndUpdate(
      {productId},
      {productId, count, userId: req.user._id},
      {upsert: true},
    )

    return res.status(200).send({status: 200, cart})
  } catch (err) {
    console.log(err)
    sendResponseError(500, `Error ${err}`, res)
  }
}
const deleteProductInCart = async (req, res) => {
  const {id} = req.params;
  try {
    await Cart.findByIdAndDelete(id)
    return res.status(200).send({status: 200})
  } catch (e) {
    console.log(err)
    sendResponseError(500, `Error ${err}`, res)
  }
}
module.exports = {addProductInCart, deleteProductInCart, getCartProducts}
