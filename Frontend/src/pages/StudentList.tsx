import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Grid, List } from 'lucide-react';
import { useStudents } from '../context/StudentContext';
import { StudentTable } from '../components/students/StudentTable';
import { StudentCard } from '../components/students/StudentCard';
import { Button } from '../components/common/Button';
import { Loading } from '../components/common/Loading';
import { deleteStudent } from '../services/studentService';

export const StudentList = () => {
  const { students, loading, removeStudent, fetchStudents } = useStudents();
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async (id: string) => {
    if (!window.confirm('Tem certeza que deseja deletar este aluno?')) {
      return;
    }

    try {
      setIsDeleting(true);
      await deleteStudent(id);
      removeStudent(id);
      await fetchStudents();
    } catch (error) {
      console.error('Erro ao deletar aluno:', error);
      alert('Erro ao deletar aluno. Tente novamente.');
    } finally {
      setIsDeleting(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Lista de Alunos</h1>
          <p className="text-gray-600 mt-1">
            {students.length} {students.length === 1 ? 'aluno cadastrado' : 'alunos cadastrados'}
          </p>
        </div>
        <div className="flex items-center gap-4">
          {/* */}
          <div className="flex bg-gray-200 rounded-lg p-1">
            <button
              onClick={() => setViewMode('table')}
              className={`p-2 rounded ${
                viewMode === 'table' ? 'bg-white shadow' : 'text-gray-600'
              }`}
              title="Visualização em tabela"
            >
              <List className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded ${
                viewMode === 'grid' ? 'bg-white shadow' : 'text-gray-600'
              }`}
              title="Visualização em grade"
            >
              <Grid className="w-5 h-5" />
            </button>
          </div>
          <Button onClick={() => navigate('/alunos/novo')}>
            + Novo Aluno
          </Button>
        </div>
      </div>

      {/* Lista de Alunos */}
      {students.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Nenhum aluno cadastrado
          </h3>
          <p className="text-gray-600 mb-6">
            Comece adicionando seu primeiro aluno ao sistema
          </p>
          <Button onClick={() => navigate('/alunos/novo')}>
            + Cadastrar Primeiro Aluno
          </Button>
        </div>
      ) : viewMode === 'table' ? (
        <StudentTable
          students={students}
          onView={(id) => navigate(`/alunos/${id}`)}
          onEdit={(id) => navigate(`/alunos/${id}/editar`)}
          onDelete={handleDelete}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {students.map((student) => (
            <StudentCard
              key={student.id}
              student={student}
              onEdit={(id) => navigate(`/alunos/${id}/editar`)}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {isDeleting && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6">
            <Loading />
          </div>
        </div>
      )}
    </div>
  );
};