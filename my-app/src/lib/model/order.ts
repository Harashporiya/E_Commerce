import { Schema, model, models } from "mongoose";

const orderSchema = new Schema(
  {
    address: {
      type: String,
      required: true,
    },
    qty: {
      type: Number,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      enum: ["S", "M", "L", "XL", "XXL"],
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  },
  { timestamps: true },
);

const Order = models.Order || model("Order", orderSchema);

export default Order;
