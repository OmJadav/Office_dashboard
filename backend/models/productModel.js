const mongoose = require("mongoose")

const productSchema = mongoose.Schema({
    product_name: {
        type: String,
        required: true,
    },
    my_rate: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    cust_name: {
        type: String,
        required: true,
    },
    dop: {
        type: String,
        required: true,
    },
    remarks: {
        type: String,
        default: "good",
    }
}, { timestamps: true })

const productModel = mongoose.model("product", productSchema);

module.exports = productModel