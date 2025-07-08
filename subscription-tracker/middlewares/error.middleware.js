//In this we are intercepting the error and trying to know much more about it

//(before request, request, response, after response) =>{}
const errorMiddleware = (err, req, res, next) =>{
    try{
        let error = { ...err };
        error.message = err.message;
        console.log(error);

        //Mongoose bad ObjectId
        if(err.name === 'CastError'){
            const message = 'Resource not found';
            error = new Error(message);
            error.statuscode = 404;
        }

        //mongoose duplicate key
        if(err.conde === 11000){
            const message = "Duplicate field value entered";
            error = new Error(message);
            error.statuscode = 400;
        }
        if(err.name === 'ValidataionError'){
            const message = Object.values(err.errors).map(val => val.message);
            error = new Error(message.join(', '));
            error.statusCode = 400;
        }

        res.status(error.statusCode || 500).json({success: false, error: error.message || "Server Error"});
    }catch(error){
        next(error);
    }
}

export default errorMiddleware;