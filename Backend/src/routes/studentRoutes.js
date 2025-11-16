import express from 'express';
import {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
  getAboveAverage,
  getLowAttendance
} from '../controllers/studentController.js';

const router = express.Router();

// Rotas requisições - reponses- testar com insominia
router.get('/', getAllStudents);
router.get('/:id', getStudentById);
router.post('/', createStudent);
router.put('/:id', updateStudent);
router.delete('/:id', deleteStudent);

// Rotas especiais
router.get('/reports/above-average', getAboveAverage);
router.get('/reports/low-attendance', getLowAttendance);

export default router;