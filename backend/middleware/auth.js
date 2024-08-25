import jwt from "jsonwebtoken"

const authMiddleware = async (req, res, next) => {
  const { token } = req.headers

  if (!token) {
    return res.json({
      success: false,
      message: "You are not authorized",
    })
  }

  try {
    const tokenDecode = jwt.decode(token)
    console.log(tokenDecode)
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET)

    console.log("Token" + token)
    console.log(decodedToken)
    req.body.userId = decodedToken.id

    console.log(req.body.userId)

    //let fileName = `${req.file.fileName}`
    //console.log(fileName)

    next()
  } catch (error) {
    console.log(error)
    return res.json({
      success: false,
      message: "Error occured",
    })
  }
}

export default authMiddleware
