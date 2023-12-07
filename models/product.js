// Product Model
import mongoose from 'mongoose';

const { String, Number } = mongoose.Schema.Types;

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    productType: {
        type: String,
        required: true
    },
    sku: {
        type: String,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    mediaUrl: {
        type: String,
        required: true
    },
    viewCount: {
        type: Number,
        default: 0
    }
},{
    timestamps: true
});
// mongoose.models.Product ||

export default mongoose?.models?.Product || mongoose?.model('Product', ProductSchema);