import { Router } from 'express';
import Authentication from '../middlewares/Authentication.js';
import MovementController from '../controllers/MovementController.js';

const router = Router();

router.get('/', Authentication.auth, MovementController.list);
router.post('/', Authentication.auth, MovementController.create);
router.delete('/:id', Authentication.auth, MovementController.delete);

export default router;