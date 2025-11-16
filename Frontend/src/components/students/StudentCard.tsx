import { Edit, Trash2, User, TrendingUp, Calendar } from 'lucide-react';
import type { StudentCardProps } from '../../types';
import { Button } from '../common/Button';

export const StudentCard = ({ student, onEdit, onDelete }: StudentCardProps) => {
  const getAttendanceColor = (attendance: number) => {
    if (attendance >= 75) return 'text-green-600 bg-green-50';
    return 'text-red-600 bg-red-50';
  };

  const getAverageColor = (average: number) => {
    if (average >= 7) return 'text-green-600';
    if (average >= 5) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <User className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">{student.name}</h3>
            <p className="text-sm text-gray-500">ID: {student.id}</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-gray-400" />
          <div>
            <p className="text-xs text-gray-600">Média</p>
            <p className={`text-xl font-bold ${getAverageColor(student.average || 0)}`}>
              {student.average?.toFixed(1) || '0.0'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-gray-400" />
          <div>
            <p className="text-xs text-gray-600">Frequência</p>
            <p className={`text-xl font-bold ${getAttendanceColor(student.attendance)}`}>
              {student.attendance}%
            </p>
          </div>
        </div>
      </div>

      {/* Grades */}
      <div className="mb-4">
        <p className="text-xs font-medium text-gray-600 mb-2">Notas por Disciplina</p>
        <div className="grid grid-cols-5 gap-2">
          {Object.entries(student.grades).map(([subject, grade]) => (
            <div key={subject} className="text-center">
              <p className="text-xs text-gray-500 capitalize truncate">{subject.slice(0, 3)}</p>
              <p className="text-sm font-bold text-gray-900">{grade?.toFixed(1) || '-'}</p>
            </div>
          ))}
        </div>
      </div>

      {/*  */}
      <div className="flex gap-2">
        {onEdit && (
          <Button
            variant="secondary"
            onClick={() => onEdit(student.id)}
            className="flex-1 flex items-center justify-center gap-2"
          >
            <Edit className="w-4 h-4" />
            Editar
          </Button>
        )}
        {onDelete && (
          <Button
            variant="danger"
            onClick={() => onDelete(student.id)}
            className="flex-1 flex items-center justify-center gap-2"
          >
            <Trash2 className="w-4 h-4" />
            Deletar
          </Button>
        )}
      </div>
    </div>
  );
};