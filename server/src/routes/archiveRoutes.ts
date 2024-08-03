import { Router } from 'express';
import {
    getArchives,
    getArchiveByID,
    getArchivesByUserID,
    createArchive,
    updateArchive,
    deleteArchive } from '../controllers/archiveController';

const router = Router();

router.get('/archives', getArchives);
router.get('/archives/:id', getArchiveByID);
router.get('/archives/user/:id', getArchivesByUserID);
router.post('/archives', createArchive);
router.put('/archives/:id', updateArchive);
router.delete('/archives/:id', deleteArchive);

export default router;
