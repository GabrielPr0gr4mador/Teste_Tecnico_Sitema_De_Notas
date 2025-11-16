import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { StudentForm } from '../components/students/StudentForm';
import { useStudents } from '../context/StudentContext';
import type { StudentFormData } from '../types';
import { createStudent, updateStudent, getStudentById } from '../services/studentService';
import { Loading } from '../components/common/Loading';

export const StudentFormPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addStudent, updateStudentInList, fetchStudents } = useStudents();
  const [initialData, setInitialData] = useState<StudentFormData | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(!!id);

  const isEditing = !!id;

  useEffect(() => {
    if (id) {
      const fetchStudent = async () => {
        try {
          setIsFetching(true);
          const student = await getStudentById(id);
          setInitialData({
            name: student.name,
            grades: student.grades,
            attendance: student.attendance,
          });
        } catch (error) {
          console.error('Erro ao buscar aluno:', error);
          alert('Erro ao carregar dados do aluno');
          navigate('/alunos');
        } finally {
          setIsFetching(false);
        }
      };
      fetchStudent();
    }
  }, [id, navigate]);

  const handleSubmit = async (data: StudentFormData) => {
    try {
      setIsLoading(true);

      if (isEditing && id) {
        // Atualizar aluno existente
        const updated = await updateStudent(id, data);
        updateStudentInList(updated);
        await fetchStudents(); // Atualizar médias
        alert('Aluno atualizado com sucesso!');
      } else {
        // Criar novo aluno
        const created = await createStudent(data);
        addStudent(created);
        await fetchStudents(); // Atualizar médias
        alert('Aluno cadastrado com sucesso!');
      }

      navigate('/alunos');
    } catch (error) {
      console.error('Erro ao salvar aluno:', error);
      alert('Erro ao salvar aluno. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/alunos');
  };

  if (isFetching) {
    return <Loading />;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <button
          onClick={() => navigate('/alunos')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition"
        >
          <ArrowLeft className="w-5 h-5" />
          Voltar para lista
        </button>
        <h1 className="text-3xl font-bold text-gray-900">
          {isEditing ? 'Editar Aluno' : 'Novo Aluno'}
        </h1>
        <p className="text-gray-600 mt-1">
          {isEditing
            ? 'Atualize as informações do aluno'
            : 'Preencha os dados para cadastrar um novo aluno'}
        </p>
      </div>

      {/* Formulário */}
      <StudentForm
        initialData={initialData}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isLoading={isLoading}
      />
    </div>
  );
};