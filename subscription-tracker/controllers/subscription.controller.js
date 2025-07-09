import Subscription from "../models/subscriptions.model.js";

export const createSubscription = async (req, res, next) =>{
    try{
        const subscription = await Subscription.create({
            ...req.body, //everything the user passes into this call
            user: req.user._id,
        });
        res.status(201).json({ success: true, data: subscription });
    }catch(error){
        next(error);
    }
}

export const getUserSubscription = async(req, res, next) =>{
    try{
        //Check if the user is the same as the one in the token (not to allow to buy subscription for other)
        if(req.user.id !== req.params.id){
            const error = new Error("You are not the owner of this account");
            error.status = 401;
            throw error;
        }

        const subscriptions = await Subscription.find({ user: req.params.id });

        res.status(200).json({ success: true, data: subscriptions });
    }catch(error){
        next(error);
    }
}