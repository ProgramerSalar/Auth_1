import express from "express"
import { isAuthenticated } from "../middleware/auth.js";
import { addCategory, addProductImage, deleteCategory, deleteProduct, deleteProductImage, getAllCategories, getAllProducts, getProductDetails, newProduct, updateProduct } from "../controllers/product.js";
import { singleUpload } from "../middleware/multer.js";





const router = express.Router()
router.post('/new', isAuthenticated, singleUpload, newProduct)
router.get("/all", getAllProducts);
router.route("/single/:id").get(getProductDetails).put(isAuthenticated, updateProduct).delete(isAuthenticated, deleteProduct)
router.route("/images/:id").post(isAuthenticated, singleUpload, addProductImage).delete(isAuthenticated, deleteProductImage)

// category
router.post("/category", isAuthenticated, addCategory);
router.get("/categories", getAllCategories);
router.delete("/category/:id", isAuthenticated, deleteCategory);

export default router;
