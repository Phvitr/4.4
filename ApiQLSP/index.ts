import { AppDataSource} from "./src/data-source";
import { Product } from "./src/entity/Product";
import express from "express";
import bodyParser from "body-parser";

const PORT = 3000;

AppDataSource.initialize().then(async connection => {
    const app = express();
    app.use(bodyParser.json());
    const productRepo = connection.getRepository((Product));

    app.post("/product/create", async (req, res) => {
        try {
            const productSearch = await productRepo.findOneBy({name: req.body.name});
            if (productSearch) {
                return res.status(500).json({message: "Product already exists"});
            }
            const productData = {
                name: req.body.name,
                avatar: req.body.avatar,
                author: req.body.author,
                price: req.body.price
            };
            const product = await productRepo.save(productData);
            if(product) {
                res.status(200).json({message:"Create product success", product: product})
            }
        }
        catch (error) {
            console.log(error);
            res.status(500).json({message: error.message});
        }
    });
    app.put("/product/update", async (req, res) => {
        try {
            let productSearch = await productRepo.findOneBy({ id: req.body.id});
            if (!productSearch) {
                return res.status(500).json({message: "Product not found"});
            }
            const product = await productRepo.update({ id: req.body.id }, req.body);
            res.status(200).json({
                message: "Update product success"
            });
        }
        catch (err) {
            res.status(500).json({
                message: err.message
            })
        }
    });
    app.delete("/product/delete", async (req, res) => {
        try {
            let productSearch = await productRepo.findOneBy({ id: req.body.id});
            if (!productSearch) {
                return res.status(500).json({message: "Product not found"});
            }
            const product = await productRepo.delete({ id: req.body.id });
            res.status(200).json({
                message: "Delete product success"
            });
        }
        catch (err) {
            res.status(500).json({
                message: err.message
            })
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
            res.status(500).json({message: err.message});
        }
    });




    app.listen(PORT, () => {
        console.log("App is listening on http://localhost:3000/product/list");
    });

})