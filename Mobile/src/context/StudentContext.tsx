import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Student, StudentsResponse, Grades } from '../@types';
import * as studentService from '../services/studentService';

interface StudentContextType {
  students: Student[];
  classAverages: Grades;
  classGeneralAverage: number;
  loading: boolean;
  error: string | null;
  fetchStudents: () => Promise<void>;
  addStudent: (student: Student) => void;
  updateStudentInList: (student: Student) => void;
  removeStudent: (id: string) => void;
}

const StudentContext = createContext<StudentContextType | undefined>(undefined);

export const StudentProvider = ({ children }: { children: ReactNode }) => {
  const [students, setStudents] = useState<Student[]>([]);
  const [classAverages, setClassAverages] = useState<Grades>({});
  const [classGeneralAverage, setClassGeneralAverage] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      setError(null);
      const data: StudentsResponse = await studentService.getAllStudents();
      setStudents(data.students);
      setClassAverages(data.classAverages);
      setClassGeneralAverage(data.classGeneralAverage);
    } catch (err) {
      setError('Erro ao carregar alunos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const addStudent = (student: Student) => {
    setStudents((prev) => [...prev, student]);
  };

  const updateStudentInList = (updatedStudent: Student) => {
    setStudents((prev) =>
      prev.map((student) => (student.id === updatedStudent.id ? updatedStudent : student))
    );
  };

  const removeStudent = (id: string) => {
    setStudents((prev) => prev.filter((student) => student.id !== id));
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <StudentContext.Provider
      value={{
        students,
        classAverages,
        classGeneralAverage,
        loading,
        error,
        fetchStudents,
        addStudent,
        updateStudentInList,
        removeStudent,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
};

export const useStudents = () => {
  const context = useContext(StudentContext);
  if (!context) {
    throw new Error('useStudents deve ser usado dentro de StudentProvider');
  }
  return context;
};