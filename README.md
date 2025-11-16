# Sistema de Gerenciamento de Notas e Frequência WEB E BACKEND

Sistema web desenvolvido para auxiliar professores no gerenciamento de notas e frequência de alunos, com cálculos automáticos de médias e identificação de alunos que necessitam atenção especial.

## Tecnologias Utilizadas

### Frontend
- React com TypeScript
- Vite - Build
- React Router DOM - Navegação
- Tailwind CSS - Estilização
- Axios - Requisições HTTP
- Lucide React - Ícones

### Backend
- Node.js com Express
- ES Modules (type: module)
- CORS – Cross-Origin Resource Sharing
- JSON File Storage - Persistência de dados (simulando banco)

## Funcionalidades

### Gerenciamento de Alunos
- Cadastro de novos alunos
- Edição de informações
- Exclusão de alunos
- Visualização detalhada

### Gestão de Notas
- Registro de notas em 5 disciplinas cadastradas no back-end:
  - Matemática
  - Português
  - Ciências
  - História
  - Geografia
- Validação: notas de 0 a 10

### Controle de Frequência
- Registro de frequência em percentual (0 a 100%)
- Alertas para frequência abaixo de 75%

### Cálculos Automáticos
- Média individual de cada aluno
- Média da turma por disciplina
- Média geral da turma
- Identificação de alunos acima da média da turma
- Identificação de alunos com frequência baixa

### Dashboard Interativo
- Visão geral do sistema
- Cards com estatísticas
- Alertas visuais para alunos que precisam de atenção
- Lista de alunos destaque

### Interface Responsiva
- Visualização em tabela ou grade (cards)
- Design moderno com Tailwind CSS
- Totalmente responsivo para desktop e mobile

## Instalação e Execução

### Pré-requisitos
- Node.js 18+ instalado
- npm ou yarn

## Instalação e Execução

## Instalação e Execução

### 1. Clone o repositório

git clone <url do repositório quando eu tiver commitado>
cd DTI-DIGITAL

cd Backend
npm install
npm run dev

O servidor estará rodando em http://localhost:3000

3. Frontend

Em outro terminal:

cd Frontend
npm install
npm run dev

A aplicação estará disponível em http://localhost: (verificar no terminal)

## Estrutura do Projeto

### Backend
```
Backend/
├── src/
│   ├── controllers/
│   │   ├── studentController.js    # CRUD de alunos
│   │   └── gradeController.js      # Atualização de notas
│   ├── routes/
│   │   ├── studentRoutes.js        # Rotas de alunos
│   │   └── gradeRoutes.js          # Rotas de notas
│   ├── models/
│   │   └── database.js             # Persistência em JSON
│   ├── utils/
│   │   └── calculations.js         # Cálculos de médias
│   └── server.js                   # Servidor Express
├── data/
│   └── students.json               # Dados (gerado automaticamente)
├── package.json
└── .env
```

### Frontend Web
```
Frontend/
├── src/
│   ├── components/
│   │   ├── common/                 # Botões, Loading, Cards
│   │   ├── layout/                 # Header, Layout
│   │   └── students/               # Componentes de alunos
│   ├── pages/
│   │   ├── Dashboard.tsx
│   │   ├── StudentList.tsx
│   │   ├── StudentDetail.tsx
│   │   └── StudentFormPage.tsx
│   ├── services/
│   │   ├── api.ts                  # Configuração Axios
│   │   └── studentService.ts       # Chamadas à API
│   ├── context/
│   │   └── StudentContext.tsx      # Estado global
│   ├── types/
│   │   └── index.ts                # TypeScript types
│   └── App.tsx
├── package.json
└── tailwind.config.js
```
    
API Endpoints
Alunos

GET /api/students - Lista todos os alunos com médias

GET /api/students/id - Busca aluno por ID

POST /api/students - Cria novo aluno

PUT /api/students/id - Atualiza aluno

DELETE /api/students/id - Remove aluno

Notas e Frequência

PUT /api/grades/id/grades - Atualiza notas do aluno

PUT /api/grades/id/attendance - Atualiza frequência do aluno

Relatórios

GET /api/students/reports/above-average - Alunos acima da média

GET /api/students/reports/low-attendance - Alunos com frequência < 75%

Sistema de Gerenciamento de Notas - Mobile
Instalação

cd Mobile
npm install

Configuração

Configure o IP do Backend (em src/services/api.ts)

const api = axios.create({ 
  baseURL: 'http://SEU_IP:3000/api', // Substitua pelo IP da sua máquina
});

Como descobrir seu IP:

# Linux/Mac
ip addr show | grep inet
# ou
ifconfig | grep inet

Certifique-se que o Backend está aceitando conexões externas (em Backend/src/server.js)

app.listen(PORT, '0.0.0.0', () => { 
  console.log(`Servidor rodando na porta ${PORT}`); 
});

Execução

Backend (obrigatório estar rodandO

cd Backend
npm run dev

Mobile

cd Mobile
npx expo start


Opções de execução:

Celular físico: Escaneie o QR Code com o app Expo Go

Android Emulator: pressione a no terminal

iOS Simulator: pressione i no terminal (apenas Mac)

Estrutura do Projeto Mobile

### Mobile

### Mobile
```
Mobile/
├── src/
│   ├── @types/                     # TypeScript types
│   ├── components/
│   │   ├── common/                 # Button, Card, Loading
│   │   └── students/               # Componentes de alunos
│   ├── screens/
│   │   ├── DashboardScreen.tsx
│   │   ├── StudentListScreen.tsx
│   │   ├── StudentDetailScreen.tsx
│   │   └── StudentFormScreen.tsx
│   ├── navigation/
│   │   └── AppNavigator.tsx        # React Navigation
│   ├── services/
│   │   ├── api.ts
│   │   └── studentService.ts
│   ├── context/
│   │   └── StudentContext.tsx
│   └── styles/
│       ├── colors.ts               # Paleta de cores
│       └── spacing.ts              # Espaçamentos
├── App.tsx
└── package.json
```


Desenvolvimento:

O app usa StyleSheet nativo do React Native com cores e espaçamentos centralizados em:

src/styles/colors.ts

src/styles/spacing.ts

Para adicionar novas cores ou espaçamentos, edite esses arquivos.

Erro ao instalar dependencias: 
rm -rf node_modules package-lock.json
npm install
