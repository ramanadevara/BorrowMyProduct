import productModel from "../models/productModel.js"
import fs from "fs"
import userModel from "../models/userModel.js"
import mongoose from "mongoose"

const addProduct = async (req, res) => {
  try {
    let image_fileName = `${req.file.filename}`

    const newProduct = new productModel({
      name: req.body.name,
      price: req.body.price,
      image: image_fileName,
      category: req.body.category,
      owner: req.body.userId,
      requestedBy: [],
      approvedUser: null,
    })

    await newProduct.save()
    res.json({ success: true, message: "Product added" })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: "Error" })
  }
}

const getProducts = async (req, res) => {
  try {
    const products = await productModel.find({})

    res.json({ success: true, products: products })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: "Error" })
  }
}

const addRequest = async (req, res) => {
  try {
    const product = await productModel.findById(req.body.id)
    product.requestedBy.push(req.body.userId)
    await product.save()

    const user = await userModel.findById(req.body.userId)

    user.requestData.push(req.body.id)

    await user.save()

    res.json({ success: true, message: "Requested successfully" })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: "Error" })
  }
}

const getUserProducts = async (req, res) => {
  try {
    const products = await productModel.find({})
    const userIdObject = new mongoose.Types.ObjectId(req.body.userId)
    const userProducts = products.filter((product) =>
      product.owner.equals(userIdObject)
    )
    res.json({ success: true, userProducts })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: "Error" })
  }
}

const getProduct = async (req, res) => {
  try {
    const product = await productModel
      .findById(req.body.productId)
      .populate("requestedBy")

    res.json({ success: true, product: product })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: "Error" })
  }
}

const approveUser = async (req, res) => {
  try {
    const product = await productModel
      .findById(req.body.productId)
      .populate("requestedBy")

    product.approvedUser = req.body.reqUserId

    await product.save()

    res.json({ success: true, message: "Product approved", product })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: "Error" })
  }
}

const checkApproved = (req, res) => {
  if (req.body.userId === req.body.product.approvedUser) {
    console.log("Success")
    res.json({ success: true, message: "Success" })
  } else {
    res.json({ success: false, message: "Failure" })
  }
}

const getOwnerDetails = async (req, res) => {
  try {
    console.log(req.body)
    const user = await userModel.findById(req.body.owner)

    const userDetails = {
      name: user.name,
      phone: user.phone,
    }

    res.json({ success: true, userDetails })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: "Error" })
  }
}
export {
  addProduct,
  getProducts,
  addRequest,
  getUserProducts,
  getProduct,
  approveUser,
  checkApproved,
  getOwnerDetails,
}
