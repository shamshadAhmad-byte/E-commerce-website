import userModel from "../models/userModel.js";
const addCart = async (req, res) => {
  const { itemId, size, userId } = req.body;
  try {
    const userData = await userModel.findById(userId);
    const cartData = await userData.cartData;
    if (cartData[itemId]) {
      if (cartData[itemId][size] > 0) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
    await userModel.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, message: "Add Cart" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Server Error" });
  }
};
const getCart = async (req, res) => {
  const { userId } = req.body;
  try {
    const userData = await userModel.findById(userId);
    if (!userData) {
      return res.json({ success: false, message: "Item not found" });
    }
    res.json({ success: true, cartData: userData.cartData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Server Error" });
  }
};
const removeCart = async (req, res) => {
  try {
    const { itemId, size, userId } = req.body;
    const userData = await userModel.findById(userId);
    const cartData = await userData.cartData;
    if (Object.keys(cartData[itemId]).length > 1) {
      delete cartData[itemId][size];
    } else if (cartData[itemId].hasOwnProperty(size)) {
      delete cartData[itemId];
    }
    await userModel.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, message: "remove data" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Server Error" });
  }
};
const updateCart = async (req, res) => {
  try {
    const { itemId, size, quantity, userId } = req.body;
    const userData = await userModel.findById(userId);
    const cartData = await userData.cartData;
    if (cartData[itemId]) {
      if (cartData[itemId][size] > 0) {
        cartData[itemId][size] = quantity;
      }
    }
    await userModel.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, message: "item update" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Server Error" });
  }
};
export { addCart, getCart, removeCart, updateCart };
