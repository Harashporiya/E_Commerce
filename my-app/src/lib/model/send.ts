import { model, models, Schema } from "mongoose";

const scheamEmail = new Schema(
  {
    otp: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true },
);
const Verifyed = models.Verifyed || model("Verifyed", scheamEmail);
export default Verifyed;
