import express from "express";
import {
  addCart,
  getCart,
  removeCart,
  updateCart,
} from "../controller/cartRoutes.js";
import userAuth from "../middlware/userAuth.js";
const cartRouter = express.Router();
cartRouter.post("/add", userAuth, addCart);
cartRouter.post("/get", userAuth, getCart);
cartRouter.post("/remove", userAuth, removeCart);
cartRouter.post("/update", userAuth, updateCart);
export default cartRouter;
