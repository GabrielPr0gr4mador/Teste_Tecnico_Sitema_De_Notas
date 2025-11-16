import { readData, writeData } from '../models/database.js';

const DISCIPLINES = ['matematica', 'portugues', 'economia', 'historia', 'geografia'];

// Atualizar notas de um aluno
export const updateGrades = async (req, res) => {
  try {
    const { id } = req.params;
    const { grades } = req.body;
    
    if (!grades || typeof grades !== 'object') {
      return res.status(400).json({ error: 'Notas inválidas' });
    }
    
    // Validar disciplinas e valores
    for (const [discipline, grade] of Object.entries(grades)) {
      if (!DISCIPLINES.includes(discipline)) {
        return res.status(400).json({ 
          error: `Disciplina inválida: ${discipline}. Disciplinas válidas: ${DISCIPLINES.join(', ')}` 
        });
      }
      
      if (grade < 0 || grade > 10) {
        return res.status(400).json({ 
          error: `Nota de ${discipline} deve estar entre 0 e 10` 
        });
      }
    }
    
    const data = await readData();
    const student = data.students.find(s => s.id === id);
    
    if (!student) {
      return res.status(404).json({ error: 'Aluno não encontrado' });
    }
    
    student.grades = { ...student.grades, ...grades };
    student.updatedAt = new Date().toISOString();
    
    await writeData(data);
    
    res.json({
      id: student.id,
      name: student.name,
      grades: student.grades
    });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar notas', details: error.message });
  }
};

// Atualizar frequência de um aluno
export const updateAttendance = async (req, res) => {
  try {
    const { id } = req.params;
    const { attendance } = req.body;
    
    if (attendance === undefined || attendance < 0 || attendance > 100) {
      return res.status(400).json({ error: 'Frequência deve estar entre 0 e 100' });
    }
    
    const data = await readData();
    const student = data.students.find(s => s.id === id);
    
    if (!student) {
      return res.status(404).json({ error: 'Aluno não encontrado' });
    }
    
    student.attendance = attendance;
    student.updatedAt = new Date().toISOString();
    
    await writeData(data);
    
    res.json({
      id: student.id,
      name: student.name,
      attendance: student.attendance
    });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar frequência', details: error.message });
  }
};