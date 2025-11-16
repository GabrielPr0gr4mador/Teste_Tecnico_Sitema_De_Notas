import { readData, writeData, generateId } from '../models/database.js';
import { 
  calculateStudentAverage, 
  calculateClassAverageByDiscipline,
  calculateClassGeneralAverage,
  getStudentsAboveAverage,
  getStudentsLowAttendance 
} from '../utils/calculations.js';

// Listar todos os alunos
export const getAllStudents = async (req, res) => {
  try {
    const data = await readData();
    const studentsWithAverage = data.students.map(student => ({
      ...student,
      average: calculateStudentAverage(student.grades)
    }));
    
    res.json({
      students: studentsWithAverage,
      classAverages: calculateClassAverageByDiscipline(data.students),
      classGeneralAverage: calculateClassGeneralAverage(data.students)
    });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar alunos', details: error.message });
  }
};

// Buscar aluno por ID
export const getStudentById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await readData();
    const student = data.students.find(s => s.id === id);
    
    if (!student) {
      return res.status(404).json({ error: 'Aluno não encontrado' });
    }
    
    res.json({
      ...student,
      average: calculateStudentAverage(student.grades)
    });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar aluno', details: error.message });
  }
};

// Criar novo aluno
export const createStudent = async (req, res) => {
  try {
    const { name, grades, attendance } = req.body;
    
    // Validações
    if (!name || name.trim() === '') {
      return res.status(400).json({ error: 'Nome é obrigatório' });
    }
    
    if (attendance !== undefined && (attendance < 0 || attendance > 100)) {
      return res.status(400).json({ error: 'Frequência deve estar entre 0 e 100' });
    }
    
    const data = await readData();
    
    const newStudent = {
      id: generateId(),
      name: name.trim(),
      grades: grades || {},
      attendance: attendance || 0,
      createdAt: new Date().toISOString()
    };
    
    data.students.push(newStudent);
    await writeData(data);
    
    res.status(201).json({
      ...newStudent,
      average: calculateStudentAverage(newStudent.grades)
    });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar aluno', details: error.message });
  }
};

// Atualizar aluno
export const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, grades, attendance } = req.body;
    
    const data = await readData();
    const index = data.students.findIndex(s => s.id === id);
    
    if (index === -1) {
      return res.status(404).json({ error: 'Aluno não encontrado' });
    }
    
    // Validações
    if (attendance !== undefined && (attendance < 0 || attendance > 100)) {
      return res.status(400).json({ error: 'Frequência deve estar entre 0 e 100' });
    }
    
    data.students[index] = {
      ...data.students[index],
      ...(name && { name: name.trim() }),
      ...(grades && { grades }),
      ...(attendance !== undefined && { attendance }),
      updatedAt: new Date().toISOString()
    };
    
    await writeData(data);
    
    res.json({
      ...data.students[index],
      average: calculateStudentAverage(data.students[index].grades)
    });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar aluno', details: error.message });
  }
};

// Deletar aluno
export const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await readData();
    const index = data.students.findIndex(s => s.id === id);
    
    if (index === -1) {
      return res.status(404).json({ error: 'Aluno não encontrado' });
    }
    
    data.students.splice(index, 1);
    await writeData(data);
    
    res.json({ message: 'Aluno removido com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar aluno', details: error.message });
  }
};

// Alunos acima da média
export const getAboveAverage = async (req, res) => {
  try {
    const data = await readData();
    const students = getStudentsAboveAverage(data.students);
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar alunos', details: error.message });
  }
};

// Alunos com frequência baixa
export const getLowAttendance = async (req, res) => {
  try {
    const data = await readData();
    const students = getStudentsLowAttendance(data.students);
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar alunos', details: error.message });
  }
};