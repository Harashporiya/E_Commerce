import { Schema, model, models } from 'mongoose';

const customerSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    orderId: {
        type: Schema.Types.ObjectId,
        ref: "Order",
        required: true
    }
}, { timestamps: true });

const Customer = models.Customer || model("Customer", customerSchema);

export default Customer;