import {
  addUser,
  getUserRequests,
  loginUser,
} from "../controllers/userController.js"
import express from "express"
import authMiddleware from "../middleware/auth.js"

const userRouter = express.Router()

userRouter.post("/add", addUser)

userRouter.post("/login", loginUser)

userRouter.post("/requests", authMiddleware, getUserRequests)

export default userRouter
