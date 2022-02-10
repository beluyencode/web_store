const db = require("../db");

class Product {
    getProduct(req, res) {
        res.json(db.product);
    }
}

module.exports = new Product;