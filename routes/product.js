import express from "express"
import { isAdmin, isAuthenticated } from "../middleware/auth.js";
import { addCategory, addProductImage, deleteCategory, deleteProduct, deleteProductImage, getAdminProducts, getAllCategories, getAllProducts, getProductDetails, newProduct, updateProduct } from "../controllers/product.js";
import { singleUpload } from "../middleware/multer.js";





const router = express.Router()
router.post('/new', isAuthenticated, isAdmin, singleUpload, newProduct)
router.get("/all", getAllProducts);
router.get("/admin", isAuthenticated, isAdmin, getAdminProducts )
router.route("/single/:id").get(getProductDetails).put(isAuthenticated,isAdmin, updateProduct).delete(isAuthenticated,isAdmin, deleteProduct)
router.route("/images/:id").post(isAuthenticated,isAdmin, singleUpload, addProductImage).delete(isAuthenticated,isAdmin, deleteProductImage)

// category
router.post("/category", isAuthenticated, isAdmin, addCategory);
router.get("/categories", getAllCategories);
router.delete("/category/:id", isAuthenticated, isAdmin, deleteCategory);

export default router;
