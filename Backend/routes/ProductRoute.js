import express from 'express'
import uploadPrd from '../middlewares/Multer.js'
import { createProduct, deleteProduct, getAllProduct, getProduct } from '../controllers/ProductController.js';
const productRouter = express.Router()

productRouter.post('/add', uploadPrd.fields([{ name: 'image1', maxCount: 1 }, { name: 'image2', maxCount: 1 }]), createProduct);
productRouter.get('/view', getAllProduct);
productRouter.delete('/remove', deleteProduct);
productRouter.get('/:id', getProduct);

export default productRouter