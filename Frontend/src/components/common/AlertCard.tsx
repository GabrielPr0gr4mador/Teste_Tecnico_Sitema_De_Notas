import type { AlertCardProps } from '../../types';

export const AlertCard = ({ title, count, icon, variant }: AlertCardProps) => {
  const variants = {
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    success: 'bg-green-50 border-green-200 text-green-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800',
  };

  return (
    <div className={`p-6 rounded-lg border-2 ${variants[variant]} transition-all hover:shadow-md`}>
      <div className="flex items-center gap-4">
        <div className="text-4xl">{icon}</div>
        <div>
          <p className="text-sm font-medium opacity-80">{title}</p>
          <p className="text-3xl font-bold">{count}</p>
        </div>
      </div>
    </div>
  );
};