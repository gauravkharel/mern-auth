import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'


// getting token from the cookie 
const protect = asyncHandler(async (req,res, next) => {
    let token
    token = req.cookies.jwt
    
    //checking the token and, verifying it
    if(token){
        try{
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            req.user = await User.findById(decoded.userId).select('-password')

            // to move on to the next middleware function
            next()
        } catch (error){
            console.log(error)
            res.status(401)
            throw new Error('Not authorized, token failed')
        }
    }else {
        res.status(401)
        throw new Error('Not authorized, no token')
    }
})


export {protect}