import mongoose from "mongoose";
const { Schema } = mongoose;
const useSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    reqired: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  cartData: {
    type: Object,
    default: {},
  },
});

const userModel = mongoose.models.user || mongoose.model("user", useSchema);
export default userModel;
