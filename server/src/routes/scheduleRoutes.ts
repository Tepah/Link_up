import { Router } from 'express';
import { getSchedules, getScheduleById, createSchedule, updateSchedule, deleteSchedule } from '../controllers/scheduleController';

const router = Router();

router.get('/schedules', getSchedules);
router.get('/schedules/:id', getScheduleById);
router.post('/schedules', createSchedule);
router.put('/schedules/:id', updateSchedule);
router.delete('/schedules/:id', deleteSchedule);

export default router;
