import { Router } from 'express';
import Authentication from '../middlewares/Authentication.js';
import ProductController from '../controllers/ProductController.js';

const router = Router();

router.get('/', Authentication.auth, ProductController.list);
router.post('/', Authentication.auth, ProductController.create);
router.patch('/:id', Authentication.auth, ProductController.update);
router.delete('/:id', Authentication.auth, ProductController.delete);

export default router;