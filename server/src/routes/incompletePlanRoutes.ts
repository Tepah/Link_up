import { Router } from 'express';
import { getIncompletePlans, getIncompletePlansById, getIncompletePlansByUser, createIncompletePlan, updateIncompletePlan, deleteIncompletePlan } from '../controllers/incompletePlanController';

const router = Router();

router.get('/incomplete', getIncompletePlans);
router.get('/incomplete/:id', getIncompletePlansById);
router.get('/incomplete/user/:id', getIncompletePlansByUser);
router.post('/incomplete', createIncompletePlan);
router.put('/incomplete/:id', updateIncompletePlan);
router.delete('/incomplete/:id', deleteIncompletePlan);

export default router;
