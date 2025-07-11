//as of now every routes file has its own controller file
import { Router } from 'express';
import { sendRedminders } from '../controllers/workflow.controller.js';

const workflowRouter = Router();

workflowRouter.post('/subscription/reminder', sendRedminders);

export default workflowRouter;