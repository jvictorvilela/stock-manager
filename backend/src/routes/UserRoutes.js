import { Router } from 'express';
import UserController from '../controllers/UserController.js';
import Authentication from '../middlewares/Authentication.js';

const router = Router();

router.post('/register', UserController.register);
router.get('/:id', Authentication.auth, UserController.show);
router.get('/', Authentication.auth, UserController.list);

export default router;