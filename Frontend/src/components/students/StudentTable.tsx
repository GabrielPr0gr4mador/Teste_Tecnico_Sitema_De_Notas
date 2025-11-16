import { Edit, Trash2, Eye } from 'lucide-react';
import type { Student } from '../../types';
import { Button } from '../common/Button';

interface StudentTableProps {
  students: Student[];
  onView?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export const StudentTable = ({ students, onView, onEdit, onDelete }: StudentTableProps) => {
  const getAttendanceColor = (attendance: number) => {
    if (attendance >= 75) return 'text-green-600 font-semibold';
    return 'text-red-600 font-semibold';
  };

  const getAverageColor = (average: number) => {
    if (average >= 7) return 'text-green-600 font-semibold';
    if (average >= 5) return 'text-yellow-600 font-semibold';
    return 'text-red-600 font-semibold';
  };

  if (students.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-8 text-center">
        <p className="text-gray-500">Nenhum aluno cadastrado</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nome
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Média
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Frequência
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Mat
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Port
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ciê
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Hist
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Geo
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {students.map((student) => (
              <tr key={student.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{student.name}</div>
                  <div className="text-xs text-gray-500">ID: {student.id}</div>
                </td>
                <td className={`px-6 py-4 whitespace-nowrap text-center ${getAverageColor(student.average || 0)}`}>
                  {student.average?.toFixed(1) || '0.0'}
                </td>
                <td className={`px-6 py-4 whitespace-nowrap text-center ${getAttendanceColor(student.attendance)}`}>
                  {student.attendance}%
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-900">
                  {student.grades.matematica?.toFixed(1) || '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-900">
                  {student.grades.portugues?.toFixed(1) || '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-900">
                  {student.grades.economia?.toFixed(1) || '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-900">
                  {student.grades.historia?.toFixed(1) || '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-900">
                  {student.grades.geografia?.toFixed(1) || '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="flex items-center justify-center gap-2">
                    {onView && (
                      <Button
                        onClick={() => onView(student.id)}
                        className="text-blue-600 hover:text-blue-800"
                        title="Ver detalhes"
                      >
                        <Eye className="w-5 h-5" />
                      </Button>
                    )}
                    {onEdit && (
                      <Button
                        onClick={() => onEdit(student.id)}
                        className="text-gray-600 hover:text-gray-800"
                        title="Editar"
                      >
                        <Edit className="w-5 h-5" />
                      </Button>
                    )}
                    {onDelete && (
                      <Button
                        onClick={() => onDelete(student.id)}
                        className="text-red-600 hover:text-red-800"
                        title="Deletar"
                      >
                        <Trash2 className="w-5 h-5" />
                      </Button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};