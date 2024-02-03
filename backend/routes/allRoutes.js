const express = require("express")
const router = express.Router()
const Product = require("../models/productModel")

router.post("/add-product", async (req, res) => {
    const { product_name, my_rate, quantity, price, cust_name, dop, remarks } = req.body

    try {
        const addProduct = new Product({ product_name, my_rate, quantity, price, cust_name, dop, remarks })
        await addProduct.save()
        res.status(201).json({ message: "Purchase Details Added Successfully!" })
    } catch (error) {
        res.status(400).json({ error: " Purchase Details Adding...error..." })
    }
})

router.get("/all-product", async (req, res) => {
    try {
        // const allproduct = await Product.find({})
        const allproduct = await Product.find({}).sort({ dop: -1 })
        // res.status(201).json(getemp)
        res.send(allproduct)
    } catch (error) {
        res.status(400).json({ error: "Getting All employee error...." })
    }

})

router.post("/edit/:productId", async (req, res) => {
    const { productId } = req.params;
    const { product_name, my_rate, quantity, price, cust_name, dop, remarks } = req.body;
    const updateDetails = { product_name, my_rate, quantity, price, cust_name, dop, remarks }
    try {
        const response = await Product.updateOne({ _id: productId }, updateDetails);
        // res.send(response);
        res.status(201).json({ message: "Product Updated Successfully!" })

    } catch (error) {
        res.status(400).json({ error: "Editing By id Error..." })
    }
})

router.get("/view/:productId", async (req, res) => {
    const { productId } = req.params;
    // console.log(empid);
    try {
        const response = await Product.findOne({ _id: productId })
        res.send(response);
    } catch (error) {
        res.status(400).json({ error: "View By id Error..." })
    }
})


router.get("/delete/:productId", async (req, res) => {
    const { productId } = req.params;
    try {
        const deleteEntry = await Product.deleteOne({ _id: productId })
        res.status(201).json({ message: "Employee Deleted Successfully!" })
    } catch (error) {
        res.status(400).json({ error: "Delete By id Error..." })
    }

})


router.get("/fetchby-date", async (req, res) => {
    try {
        const { start, end } = req.query;

        // Assuming 'dop' is the date of purchase field in your Product model
        const products = await Product.find({
            dop: { $gte: start, $lte: end },
        });

        res.json(products);
    } catch (error) {
        console.error("Error fetching products by date range:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


module.exports = router;