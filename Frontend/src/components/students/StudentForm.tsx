import { useState } from 'react';
import type { StudentFormData, Grades } from '../../types';
import { GradeInput } from './GradeInput';
import { Button } from '../common/Button';

interface StudentFormProps {
  initialData?: StudentFormData;
  onSubmit: (data: StudentFormData) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export const StudentForm = ({ initialData, onSubmit, onCancel, isLoading }: StudentFormProps) => {
  const [name, setName] = useState(initialData?.name || '');
  const [attendance, setAttendance] = useState(initialData?.attendance || 0);
  const [grades, setGrades] = useState<Grades>(initialData?.grades || {
    matematica: 0,
    portugues: 0,
    economia: 0,
    historia: 0,
    geografia: 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, grades, attendance });
  };

  const updateGrade = (subject: keyof Grades, value: number) => {
    setGrades(prev => ({ ...prev, [subject]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        {initialData ? 'Editar Aluno' : 'Novo Aluno'}
      </h2>

      {/* Nome */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Nome do Aluno *
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Digite o nome completo"
        />
      </div>

      {/* Frequência */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Frequência (%)
        </label>
        <input
          type="number"
          value={attendance}
          onChange={(e) => {
            const val = parseFloat(e.target.value);
            if (!isNaN(val) && val >= 0 && val <= 100) {
              setAttendance(val);
            }
          }}
          min="0"
          max="100"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="0 - 100"
        />
        <span className="text-xs text-gray-500">Porcentagem de presença (0 a 100%)</span>
      </div>

      {/* Notas */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Notas por Disciplina</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <GradeInput
            label="Matemática"
            value={grades.matematica}
            onChange={(val) => updateGrade('matematica', val)}
          />
          <GradeInput
            label="Português"
            value={grades.portugues}
            onChange={(val) => updateGrade('portugues', val)}
          />
          <GradeInput
            label="Economia"
            value={grades.economia}
            onChange={(val) => updateGrade('economia', val)}
          />
          <GradeInput
            label="História"
            value={grades.historia}
            onChange={(val) => updateGrade('historia', val)}
          />
          <GradeInput
            label="Geografia"
            value={grades.geografia}
            onChange={(val) => updateGrade('geografia', val)}
          />
        </div>
      </div>

      {/* Botões */}
      <div className="flex gap-4">
        <Button
          type="submit"
          variant="primary"
          isLoading={isLoading}
          className="flex-1"
        >
          {initialData ? 'Salvar Alterações' : 'Cadastrar Aluno'}
        </Button>
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
          disabled={isLoading}
          className="flex-1"
        >
          Cancelar
        </Button>
      </div>
    </form>
  );
};