import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, TrendingUp, AlertTriangle, Award } from 'lucide-react';
import { useStudents } from '../context/StudentContext';
import { AlertCard } from '../components/common/AlertCard';
import { Button } from '../components/common/Button';
import { Loading } from '../components/common/Loading';
import type{ Student } from '../types';
import { getStudentsAboveAverage, getStudentsLowAttendance } from '../services/studentService';

export const Dashboard = () => {
  const { students, classGeneralAverage, loading } = useStudents();
  const navigate = useNavigate();
  const [studentsAbove, setStudentsAbove] = useState<Student[]>([]);
  const [studentsLow, setStudentsLow] = useState<Student[]>([]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const [above, low] = await Promise.all([
          getStudentsAboveAverage(),
          getStudentsLowAttendance(),
        ]);
        setStudentsAbove(above);
        setStudentsLow(low);
      } catch (error) {
        console.error('Erro ao buscar relatórios:', error);
      }
    };

    if (students.length > 0) {
      fetchReports();
    }
  }, [students]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Visão geral do sistema de gerenciamento</p>
        </div>
        <div className="flex gap-1">
        <Button onClick={() => navigate('/alunos/')}>
          Visualizar todos os alunos
        </Button>
        <Button onClick={() => navigate('/alunos/novo')}>
          + Novo Aluno
        </Button>
        </div>
      </div>

      {/* Cards  */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <AlertCard
          title="Total de Alunos"
          count={students.length}
          icon={<Users />}
          variant="info"
        />
        <AlertCard
          title="Média da Turma"
          count={parseFloat(classGeneralAverage.toFixed(1))}
          icon={<TrendingUp />}
          variant="success"
        />
        <AlertCard
          title="Acima da Média"
          count={studentsAbove.length}
          icon={<Award />}
          variant="success"
        />
        <AlertCard
          title="Frequência Baixa"
          count={studentsLow.length}
          icon={<AlertTriangle />}
          variant="warning"
        />
      </div>

      {/* Alunos com baixa frequência */}
      {studentsLow.length > 0 && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg">
          <div className="flex items-start gap-4">
            <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
            <div className="flex-1">
              <h3 className="text-lg font-bold text-yellow-900 mb-2">
                 Alunos com Frequência Abaixo de 75%
              </h3>
              <p className="text-yellow-800 mb-4">
                Os seguintes alunos precisam de atenção especial devido à baixa frequência:
              </p>
              <div className="space-y-2">
                {studentsLow.map((student) => (
                  <div
                    key={student.id}
                    className="bg-white rounded p-3 flex items-center justify-between"
                  >
                    <div>
                      <p className="font-semibold text-gray-900">{student.name}</p>
                      <p className="text-sm text-gray-600">
                        Frequência: {student.attendance}% | Média: {student.average?.toFixed(1)}
                      </p>
                    </div>
                    <Button
                      variant="secondary"
                      onClick={() => navigate(`/alunos/${student.id}`)}
                    >
                      Ver Detalhes
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Alunos com notas altas*/}
      {studentsAbove.length > 0 && (
        <div className="bg-green-50 border-l-4 border-green-400 p-6 rounded-lg">
          <div className="flex items-start gap-4">
            <Award className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
            <div className="flex-1">
              <h3 className="text-lg font-bold text-green-900 mb-2">
                Alunos Acima da Média da Turma
              </h3>
              <p className="text-green-800 mb-4">
                Estes alunos estão com desempenho acima da média de {classGeneralAverage.toFixed(1)}:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {studentsAbove.map((student) => (
                  <div
                    key={student.id}
                    className="bg-white rounded p-3 flex items-center justify-between"
                  >
                    <div>
                      <p className="font-semibold text-gray-900">{student.name}</p>
                      <p className="text-sm text-gray-600">
                        Média: {student.average?.toFixed(1)} | Frequência: {student.attendance}%
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quando a Página estiver vazia */}
      {students.length === 0 && (
        <div className="text-center py-12">
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
      )}
    </div>
  );
};