const express = require("express");
const { createProduct, getAllProducts, productDetails, updateProductDetails, deleteProduct } = require("../controller/productController");
const { isAuthenticated , authRole } = require("../middleWares/auth");




const router = express.Router();


router.route("/product/create").post(isAuthenticated,authRole("admin"),createProduct);
router.route("/products").get(getAllProducts);
router.route("/product/:id").get(productDetails)
router.route("/product/update/:id").put(isAuthenticated,authRole("admin"),updateProductDetails);
router.route("/product/:id").delete(isAuthenticated,authRole("admin"),deleteProduct);
// router.route("/products").get(getAllProducts);
// router.route("/product/:id").get(getProductById);
// router.route("/product/update/:id").put(updateProduct);


module.exports = router;