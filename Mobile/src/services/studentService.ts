import api from './api';
import { Student, StudentsResponse, StudentFormData, Grades } from '../@types';

export const getAllStudents = async (): Promise<StudentsResponse> => {
  const response = await api.get<StudentsResponse>('/students');
  return response.data;
};

export const getStudentById = async (id: string): Promise<Student> => {
  const response = await api.get<Student>(`/students/${id}`);
  return response.data;
};

export const createStudent = async (data: StudentFormData): Promise<Student> => {
  const response = await api.post<Student>('/students', data);
  return response.data;
};

export const updateStudent = async (id: string, data: Partial<StudentFormData>): Promise<Student> => {
  const response = await api.put<Student>(`/students/${id}`, data);
  return response.data;
};

export const deleteStudent = async (id: string): Promise<void> => {
  await api.delete(`/students/${id}`);
};

export const updateGrades = async (id: string, grades: Grades): Promise<Student> => {
  const response = await api.put<Student>(`/grades/${id}/grades`, { grades });
  return response.data;
};

export const updateAttendance = async (id: string, attendance: number): Promise<Student> => {
  const response = await api.put<Student>(`/grades/${id}/attendance`, { attendance });
  return response.data;
};

export const getStudentsAboveAverage = async (): Promise<Student[]> => {
  const response = await api.get<Student[]>('/students/reports/above-average');
  return response.data;
};

export const getStudentsLowAttendance = async (): Promise<Student[]> => {
  const response = await api.get<Student[]>('/students/reports/low-attendance');
  return response.data;
};