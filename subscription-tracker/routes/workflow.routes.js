import { Router } from 'express';

const workflowRouter = Router();

workflowRouter.get('/', (req,res)=>{res.json({ message: "Work flow router"})});

export default workflowRouter;