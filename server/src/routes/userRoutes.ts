import { Router } from 'express';
import {getUsers, getUser, createUser, updateUser, deleteUser, loginUser} from '../controllers/userController';

const router = Router();

router.get('/users', getUsers);
router.get('/users/:id', getUser);
router.post('/users', createUser);
router.post('/users/login', loginUser);
router.put('/users/:id', updateUser)
router.delete('/users/:id', deleteUser);

export default router;
