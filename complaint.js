import express from 'express';
import authMiddleware from '../middleware/authMiddlware.js';
import { submitComplaint, getComplaints, deleteComplaint } from '../controllers/complaintController.js';

const router = express.Router();

router.post('/submit', authMiddleware, submitComplaint);
router.get('/', authMiddleware, getComplaints);
router.delete('/:id', authMiddleware, deleteComplaint);

export default router;