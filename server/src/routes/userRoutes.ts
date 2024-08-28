import { Router } from 'express';
import {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    loginUser,
    authenticateToken
} from '../controllers/userController';
import {RequestWithUser} from "../types/types";

const router = Router();

router.get('/users/auth', authenticateToken, (req: RequestWithUser, res) => {
    if (req.user) {
        res.json(req.user);
    } else {
        res.status(401).send('Unauthorized');
    }
})
router.get('/users', getUsers);
router.get('/users/:id', getUser);
router.post('/users', createUser);
router.post('/users/login', loginUser);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

export default router;
