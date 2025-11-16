import { GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition">
            <GraduationCap className="w-8 h-8 text-blue-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Sistema de Notas</h1>
              <p className="text-sm text-gray-600">Gerenciamento de Alunos</p>
            </div>
          </Link>
          
          <nav className="flex gap-6">
            <Link 
              to="/" 
              className="text-gray-700 hover:text-blue-600 font-medium transition"
            >
              Dashboard
            </Link>
            <Link 
              to="/alunos" 
              className="text-gray-700 hover:text-blue-600 font-medium transition"
            >
              Alunos
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};