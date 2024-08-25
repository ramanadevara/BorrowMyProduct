import validator from "validator"
import userModel from "../models/userModel.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET)
}

const addUser = async (req, res) => {
  try {
    const { name, password, email, phone } = req.body

    const exists = await userModel.findOne({ email })

    if (exists) {
      return res.json({ success: false, message: "User email already exists" })
    }

    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Enter valid email" })
    }

    if (password.length < 8) {
      return res.json({ success: false, message: "Enter a strong password" })
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const newUser = new userModel({
      name: name,
      email: email,
      password: hashedPassword,
      phone: phone,
      requestData: [],
    })

    const user = await newUser.save()

    console.log("User id: " + user._id)
    const token = createToken(user._id)
    console.log(token)

    return res.json({ success: true, token })
  } catch (error) {
    console.log(error)
    return res.json({
      success: false,
      message: "Error occured while registering user",
    })
  }
}

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await userModel.findOne({ email })

    if (!user) {
      return res.json({
        success: false,
        message: "User email or password incorrect",
      })
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return res.json({
        success: false,
        message: "User email or password incorrect",
      })
    }

    const token = createToken(user._id)

    res.json({ success: true, token })
  } catch (error) {
    console.log(error)
    res.json({
      success: false,
      message: "Error occured while registering user",
    })
  }
}

const getUserRequests = async (req, res) => {
  try {
    const user = await userModel
      .findById(req.body.userId)
      .populate("requestData")
    const requests = await user.requestData
    res.json({ success: true, requests })
  } catch (error) {
    console.log(error)
    res.json({
      success: false,
      message: "Error occured while fetching user requests",
    })
  }
}

export { addUser, loginUser, getUserRequests }
