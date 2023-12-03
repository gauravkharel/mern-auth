
// catch all error for any routes that don't exist
const notFound = (req, res, next) => {
    const error = new Error(`Not found - ${req.originalUrl}`)
    res.status(404)
    next(error)
}

//catch-all for any errors that occur in our routes
const errorHandler = (err, req, res,next) => {
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode
    let message = err.message

    // If mongoose not found error, set to 404 and, change message
    if(err.name === 'CastError' && err.kind === 'ObjectId'){
        statusCode = 404
        message = 'Resource not found'
    }

    res.status(statusCode).json({
        message: message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    })
}

export {notFound, errorHandler}