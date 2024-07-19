import { Router } from 'express';
import { getPlans, getPlanByID, getPlansByUserID, getPlansByHostID, updatePlan, createPlan, deletePlan} from "../controllers/planController";

const router = Router();

router.get('/plans', getPlans);
router.get('/plans/:id', getPlanByID);
router.get('/plans/user/:id', getPlansByUserID);
router.get('/plans/host/:id', getPlansByHostID);
router.put('/plans/:id', updatePlan);
router.post('/plans', createPlan);
router.delete('/plans/:id', deletePlan);

export default router;
