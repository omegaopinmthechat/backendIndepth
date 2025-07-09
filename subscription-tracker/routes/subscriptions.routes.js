import { Router } from "express";
import authorize from "../middlewares/auth.middleware.js";
import { createSubscription, getUserSubscription } from "../controllers/subscription.controller.js";

const subRouter = Router();

//Do get all subscriptions and fet subscription details on your own
//May be do the rest too
subRouter.get('/', (req, res) =>{
    res.send({tite: "GET all subscriptions"})
})

subRouter.get('/:id', (req, res) =>{
    res.send({title: "GET subscription details"})
})

subRouter.post('/', authorize, createSubscription)

subRouter.put('/:id', (req, res) =>{
    res.send({title: "UPDATE subscription"})
})

subRouter.delete('/:id', (req, res) =>{
    res.send({title: "DELETE subscription"})
})

subRouter.get('/user/:id', authorize, getUserSubscription)

subRouter.put('/:id/cancel', (req, res) => {
    res.send({title: 'CANCEL subscription'})
})

subRouter.get('upcoming-renewals', (req, res) =>{
    res.send({title: 'GET upcoming renewals'})
})

export default subRouter;