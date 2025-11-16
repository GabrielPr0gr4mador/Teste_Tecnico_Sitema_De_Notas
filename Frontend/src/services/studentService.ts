import api from './api';
import type { Grades, Student, StudentsResponse, StudentFormData } from "../types/index";

// Listar todos os alunos
export const getAllStudents = async (): Promise<StudentsResponse> => {
  const response = await api.get<StudentsResponse>('/students');
  return response.data;
};

// Buscar aluno por ID
export const getStudentById = async (id: string): Promise<Student> => {
  const response = await api.get<Student>(`/students/${id}`);
  return response.data;
};

// Criar aluno
export const createStudent = async (data: StudentFormData): Promise<Student> => {
  const response = await api.post<Student>('/students', data);
  return response.data;
};

// Atualizar aluno
export const updateStudent = async (id: string, data: Partial<StudentFormData>): Promise<Student> => {
  const response = await api.put<Student>(`/students/${id}`, data);
  return response.data;
};

// Deletar aluno
export const deleteStudent = async (id: string): Promise<void> => {
  await api.delete(`/students/${id}`);
};

// Atualizar notas
export const updateGrades = async (id: string, grades: Grades): Promise<Student> => {
  const response = await api.put<Student>(`/grades/${id}/grades`, { grades });
  return response.data;
};

// Atualizar frequência
export const updateAttendance = async (id: string, attendance: number): Promise<Student> => {
  const response = await api.put<Student>(`/grades/${id}/attendance`, { attendance });
  return response.data;
};

// Alunos acima da média
export const getStudentsAboveAverage = async (): Promise<Student[]> => {
  const response = await api.get<Student[]>('/students/reports/above-average');
  return response.data;
};

// Alunos com frequência baixa
export const getStudentsLowAttendance = async (): Promise<Student[]> => {
  const response = await api.get<Student[]>('/students/reports/low-attendance');
  return response.data;
};