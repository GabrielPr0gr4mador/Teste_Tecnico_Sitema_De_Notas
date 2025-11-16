import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import studentRoutes from './routes/studentRoutes.js';
import gradeRoutes from './routes/gradeRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/students', studentRoutes);
app.use('/api/grades', gradeRoutes);

app.get('/', (req, res) => {
    res.json({ message: 'API de Gerencimaneto de Alunos'})
});

app.use((req, res) => {
    res.status(404).json({ error: 'Rota não encontrada'});
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(` Servidor rodando na porta ${PORT}`);
  console.log(`Acesse do celular: http://192.168.1.110:${PORT}`);
});