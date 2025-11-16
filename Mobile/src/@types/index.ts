// Disciplinas disponíveis
export type Discipline = 'matematica' | 'portugues' | 'economia' | 'historia' | 'geografia';

// Notas por disciplina
export interface Grades {
  matematica?: number;
  portugues?: number;
  economia?: number;
  historia?: number;
  geografia?: number;
}

// Estudante
export interface Student {
  id: string;
  name: string;
  grades: Grades;
  attendance: number;
  average?: number;
  createdAt?: string;
  updatedAt?: string;
}

// Resposta da API ao listar estudantes
export interface StudentsResponse {
  students: Student[];
  classAverages: Grades;
  classGeneralAverage: number;
}

// Formulário de criar/editar estudante
export interface StudentFormData {
  name: string;
  grades?: Grades;
  attendance?: number;
}