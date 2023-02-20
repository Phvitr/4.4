"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("./src/data-source");
const Product_1 = require("./src/entity/Product");
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const PORT = 3000;
data_source_1.AppDataSource.initialize().then(async (connection) => {
    const app = (0, express_1.default)();
    app.use(body_parser_1.default.json());
    const productRepo = connection.getRepository((Product_1.Product));
    app.post("/product/create", async (req, res) => {
        try {
            const productSearch = await productRepo.findOneBy({ name: req.body.name });
            if (productSearch) {
                return res.status(500).json({ message: "Product already exists" });
            }
            const productData = {
                name: req.body.name,
                avatar: req.body.avatar,
                author: req.body.author,
                price: req.body.price
            };
            const product = await productRepo.save(productData);
            if (product) {
                res.status(200).json({ message: "Create product success", product: product });
            }
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ message: error.message });
        }
    });
    app.put("/product/update", async (req, res) => {
        try {
            let productSearch = await productRepo.findOneBy({ id: req.body.id });
            if (!productSearch) {
                return res.status(500).json({ message: "Product not found" });
            }
            const product = await productRepo.update({ id: req.body.id }, req.body);
            res.status(200).json({
                message: "Update product success"
            });
        }
        catch (err) {
            res.status(500).json({
                message: err.message
            });
        }
    });
    app.delete("/product/delete", async (req, res) => {
        try {
            let productSearch = await productRepo.findOneBy({ id: req.body.id });
            if (!productSearch) {
                return res.status(500).json({ message: "Product not found" });
            }
            const product = await productRepo.delete({ id: req.body.id });
            res.status(200).json({
                message: "Delete product success"
            });
        }
        catch (err) {
            res.status(500).json({
                message: err.message
            });
        }
    });
    app.get("/product/list", async (req, res) => {
        try {
            const products = await productRepo.find();
            if (products) {
                res.status(200).json({
                    message: "Get products success",
                    products: products
                });
            }
        }
        catch (err) {
            console.log(err);
            res.status(500).json({ message: err.message });
        }
    });
    app.listen(PORT, () => {
        console.log("App is listening on http://localhost:3000/product/list");
    });
});
//# sourceMappingURL=index.js.map