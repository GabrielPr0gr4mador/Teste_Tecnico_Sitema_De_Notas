import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { StudentProvider } from './context/StudentContext';
import { Layout } from './components/layout/Layout';
import { Dashboard } from './pages/Dashboard';
import { StudentList } from './pages/StudentList';
import { StudentFormPage } from './pages/StudentFormPage';
import { StudentDetail } from './pages/StudentDetail';
import { SeeStudents } from './pages/SeeStudents';

function App() {
  return (
    <BrowserRouter>
      <StudentProvider>
        <Layout>
          <Routes>
            {/*Define o caminho das rotas para cada pagina para o navigate*/}
            <Route path="/" element={<Dashboard />} />
            {<Route path="/alunos" element={<StudentList />} />}
            <Route path="/alunos/novo" element={<StudentFormPage />} />
            <Route path="/alunos/:id" element={<StudentDetail />} />
            <Route path="/alunos/:id/editar" element={<StudentFormPage />} />
            <Route path="/" element={<SeeStudents />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </StudentProvider>
    </BrowserRouter>
  );
}

export default App;