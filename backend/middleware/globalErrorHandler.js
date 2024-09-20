const errorHandler = (err , req ,res,next) =>{
    let statusCode = err.statusCode || 500;
    let errorMessage = err.message || "internal Server Error"
    if(err.name === "ValidationError"){
        const errors = Object.values(err.errors).map(error=> error.message);
        statusCode = 400;
        errorMessage = errors;
    }
    // else if( err.name === "existingUserError"){

    // }

    res.status(statusCode).send({ status : "Fail" ,message : errorMessage})
}

module.exports = errorHandler;