import { Schema, model, models } from "mongoose";

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    brandName: {
        type: String,
        required: true,
    },
    prise: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    size: {
        type: String,
        enum: ['S', 'M', 'L', 'XL', 'XXL']
    },
    option: {
        type: String,
        enum: ["Men", "Women"]
    }
}, { timestamps: true });

const Product = models.Product || model('Product', productSchema);

export default Product;