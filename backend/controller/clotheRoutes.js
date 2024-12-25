import clotheModel from "../models/clotheModel.js";
import fs from "fs";
const addClothe = async (req, res) => {
  try {
    if (req.files.length < 0) {
      return res.json({ success: false, message: "Add file" });
    }
    const temp = req.files.map((information) => information.filename);
    const newclothe = new clotheModel({
      name: req.body.name,
      description: req.body.description,
      price: Number(req.body.price),
      category: req.body.category,
      subCategory: req.body.subCategory,
      image: temp,
      size: req.body.sizes.split(","),
      date: Date.now(),
      bestSeller: req.body.bestSeller,
    });
    await newclothe.save();
    res.json({ success: true, message: "successful add clothe" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: " Server Error" });
  }
};
const removeClothe = async (req, res) => {
  try {
    const deleteData = await clotheModel.findById(req.body.id);
    deleteData.image.forEach((element) => {
      fs.unlink(`uploads/${element}`, () => {});
    });
    await clotheModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "remove successful" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Server Error" });
  }
};
const listClothe = async (req, res) => {
  try {
    const clothe = await clotheModel.find({});
    res.json({ success: true, clothe: clothe });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Server Error" });
  }
};
export { addClothe, removeClothe, listClothe };
