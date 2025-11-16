import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Edit, Trash2, User, TrendingUp, Calendar, BookOpen } from 'lucide-react';
import type { Student } from '../types';
import { getStudentById, deleteStudent } from '../services/studentService';
import { Button } from '../components/common/Button';
import { Loading } from '../components/common/Loading';
import { useStudents } from '../context/StudentContext';

export const StudentDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { removeStudent, fetchStudents } = useStudents();
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudent = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const data = await getStudentById(id);
        setStudent(data);
      } catch (error) {
        console.error('Erro ao buscar aluno:', error);
        alert('Erro ao carregar dados do aluno');
        navigate('/alunos');
      } finally {
        setLoading(false);
      }
    };
    fetchStudent();
  }, [id, navigate]);

  const handleDelete = async () => {
    if (!id || !window.confirm('Tem certeza que deseja deletar este aluno?')) {
      return;
    }

    try {
      await deleteStudent(id);
      removeStudent(id);
      await fetchStudents();
      alert('Aluno deletado com sucesso!');
      navigate('/alunos');
    } catch (error) {
      console.error('Erro ao deletar aluno:', error);
      alert('Erro ao deletar aluno. Tente novamente.');
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (!student) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Aluno não encontrado</p>
      </div>
    );
  }

  const getAttendanceColor = (attendance: number) => {
    if (attendance >= 75) return 'text-green-600 bg-green-50';
    return 'text-red-600 bg-red-50';
  };

  const getAverageColor = (average: number) => {
    if (average >= 7) return 'text-green-600 bg-green-50';
    if (average >= 5) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

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
      </div>

      {/* Card Principal */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header do Card */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-8 py-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <User className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">{student.name}</h1>
                <p className="text-blue-100">ID: {student.id}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="secondary"
                onClick={() => navigate(`/alunos/${id}/editar`)}
                className="flex items-center gap-2"
              >
                <Edit className="w-4 h-4" />
                Editar
              </Button>
              <Button
                variant="danger"
                onClick={handleDelete}
                className="flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Deletar
              </Button>
            </div>
          </div>
        </div>

        {/**/}
        <div className="p-8 space-y-8">
          {/* Estatísticas */}
          <div className="grid grid-cols-2 gap-6">
            <div className={`p-6 rounded-lg border-2 ${getAverageColor(student.average || 0)}`}>
              <div className="flex items-center gap-3 mb-2">
                <TrendingUp className="w-6 h-6" />
                <h3 className="text-lg font-semibold">Média Geral</h3>
              </div>
              <p className="text-4xl font-bold">{student.average?.toFixed(1) || '0.0'}</p>
            </div>

            <div className={`p-6 rounded-lg border-2 ${getAttendanceColor(student.attendance)}`}>
              <div className="flex items-center gap-3 mb-2">
                <Calendar className="w-6 h-6" />
                <h3 className="text-lg font-semibold">Frequência</h3>
              </div>
              <p className="text-4xl font-bold">{student.attendance}%</p>
            </div>
          </div>

          {/* Notas por disciplina */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <BookOpen className="w-6 h-6 text-gray-600" />
              <h3 className="text-xl font-bold text-gray-900">Notas por Disciplina</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(student.grades).map(([subject, grade]) => (
                <div
                  key={subject}
                  className="bg-gray-50 rounded-lg p-4 flex items-center justify-between border border-gray-200"
                >
                  <span className="font-medium text-gray-700 capitalize">{subject}</span>
                  <span className="text-2xl font-bold text-gray-900">
                    {grade?.toFixed(1) || '-'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Alertas */}
          {student.attendance < 75 && (
            <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded">
              <p className="text-red-800 font-medium">
                Atenção: Este aluno possui frequência abaixo de 75% e precisa de acompanhamento especial.
              </p>
            </div>
          )}

          {/**/}
          {student.createdAt && (
            <div className="pt-6 border-t text-sm text-gray-600">
              <p>Cadastrado em: {new Date(student.createdAt).toLocaleString('pt-BR')}</p>
              {student.updatedAt && (
                <p>Última atualização: {new Date(student.updatedAt).toLocaleString('pt-BR')}</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};