 import  express  from "express";
import { adminOnly } from "../middlewares/auth.js";
import { deleteProduct, getAdminProducts, getAllCategories, getAllProducts, getLatestProducts, getSingleProducts, newProduct, updateProduct } from "../controllers/product.js";
import { singleUpload } from "../middlewares/multer.js";
const app = express.Router();

// To Create New Product - /api/v1/product/new
app.post("/new", adminOnly, singleUpload, newProduct);

// Get All Products with filter - /api/v1/product/all
app.get("/all", getAllProducts)

// To get Last 10 Products - /api/v1/product/Latest
app.get("/latest", getLatestProducts);

// To get all unique Categories - /api/v1/product/categories
app.get("/categories", getAllCategories);


// To get all products - /api/v1/product/admin-products
app.get("/admin-products", getAdminProducts);


// To get, update, delete
app.
route("/:id")
.get(getSingleProducts)
.put(adminOnly, singleUpload, updateProduct)
.delete(adminOnly, deleteProduct)







export default app;