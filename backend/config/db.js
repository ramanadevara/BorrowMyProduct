import mongoose from "mongoose"

const connectDB = async () => {
  mongoose
    .connect(
      "mongodb+srv://venkatdevara98:Saharsh98@bmp.6kpvm.mongodb.net/?retryWrites=true&w=majority&appName=Bmp/borrow-my-product"
    )
    .then(() => {
      console.log("DB connected")
    })
}

export default connectDB
