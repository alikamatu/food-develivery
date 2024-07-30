import express from 'express'
import { listOrder, placeOrder, updateStatus, userOrder, verifyOrder } from '../controllers/orderController.js';
import authMiddleWare from '../middleware/auth.js';


const orderRouter = express.Router();


orderRouter.post("/place", authMiddleWare, placeOrder)
orderRouter.post("/verify", verifyOrder)
orderRouter.post("/userorders", authMiddleWare, userOrder)
orderRouter.get("/listorders", listOrder)
orderRouter.post("/status", updateStatus)

export default orderRouter;