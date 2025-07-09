import User from "../models/user.model.js";

export const getUsers = async(req, res, next) =>{
    try{
        const users = await User.find(); //find all the users

        res.status(200).json({
            success: true,
            data: users,
        })
    }catch(error){
        next(error);
    }
}


// req.params = {
//   id: "random-id",
// };
//GET /api/users/random-id
// /:id in routes is 
export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select('-password'); //find the user by id

    if(!user){
        const error = new Error("User not found");
        error.statusCode =404;
        throw error;
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};