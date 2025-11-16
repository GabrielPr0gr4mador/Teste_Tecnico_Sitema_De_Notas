import express from 'express';
import { updateGrades, updateAttendance } from '../controllers/gradeController.js';

const router = express.Router();

// Atualizar notas de um aluno
router.put('/:id/grades', updateGrades);

// Atualizar frequência de um aluno
router.put('/:id/attendance', updateAttendance);

export default router;