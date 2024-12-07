import mongoose, { Mongoose } from "mongoose"

const productSchema = mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  requestedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
  isApproved: { type: Boolean, default: false },
  approvedUser: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
})

const productModel =
  mongoose.models.productModel || mongoose.model("product", productSchema)

export default productModel
