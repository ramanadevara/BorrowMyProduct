import mongoose, { Mongoose } from "mongoose"

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: Number, required: true },
  password: { type: String, required: true },
  requestData: [{ type: mongoose.Schema.Types.ObjectId, ref: "product" }],
})

const userModel = mongoose.models.user || mongoose.model("user", userSchema)

export default userModel
