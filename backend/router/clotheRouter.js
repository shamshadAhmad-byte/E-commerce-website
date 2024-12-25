import express from "express";
import {
  addClothe,
  removeClothe,
  listClothe,
} from "../controller/clotheRoutes.js";
import uploads from "../middlware/multer.js";
import adminAuth from "../middlware/adminAuth.js";

const clotheRouter = express.Router();

clotheRouter.post("/add", adminAuth, uploads.array("image", 5), addClothe);
clotheRouter.post("/remove", adminAuth, removeClothe);
clotheRouter.get("/list", listClothe);
export default clotheRouter;
