interface GradeInputProps {
  label: string;
  value: number | undefined;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

export const GradeInput = ({ label, value, onChange, min = 0, max = 10 }: GradeInputProps) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <input
        type="number"
        value={value ?? ''}
        onChange={(e) => {
          const val = parseFloat(e.target.value);
          if (!isNaN(val) && val >= min && val <= max) {
            onChange(val);
          } else if (e.target.value === '') {
            onChange(0);
          }
        }}
        min={min}
        max={max}
        step="0.5"
        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder={`${min} - ${max}`}
      />
      <span className="text-xs text-gray-500">Nota de {min} a {max}</span>
    </div>
  );
};