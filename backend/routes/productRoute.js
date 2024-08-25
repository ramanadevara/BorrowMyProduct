import {
  addProduct,
  addRequest,
  getProduct,
  getProducts,
  getUserProducts,
} from "../controllers/productController.js"

import express from "express"

import multer from "multer"
import authMiddleware from "../middleware/auth.js"

const productRouter = express.Router()

const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}${file.originalname}`)
  },
})

const upload = multer({ storage: storage })
productRouter.post("/add", upload.single("image"), authMiddleware, addProduct)
productRouter.get("/get", getProducts)
productRouter.post("/request", authMiddleware, addRequest)
productRouter.get("/getUserProducts", authMiddleware, getUserProducts)
productRouter.post("/getProduct", authMiddleware, getProduct)
export default productRouter
