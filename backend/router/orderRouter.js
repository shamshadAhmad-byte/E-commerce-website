import express from "express";
import userAuth from "../middlware/userAuth.js";
import adminAuth from "../middlware/adminAuth.js";
import {
  listOrder,
  placedOrderCOD,
  placedOrderStripe,
  updateStatus,
  userOrder,
  varifyOrder,
} from "../controller/orderRoutes.js";
const orderRouter = express.Router();

// order placed status
orderRouter.post("/placeordercod", userAuth, placedOrderCOD);
orderRouter.post("/placeorderstripe", userAuth, placedOrderStripe);

// list admin pannel feature
orderRouter.post("/list", adminAuth, listOrder);

// list display frontend
orderRouter.post("/userorder", userAuth, userOrder);

// verify
orderRouter.post("/updatestatus", adminAuth, updateStatus);
orderRouter.post("/verifyorder", userAuth, varifyOrder);

export default orderRouter;
