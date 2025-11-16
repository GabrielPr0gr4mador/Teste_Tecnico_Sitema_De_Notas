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

### 1. Clone o repositório
```bash
git clone <url do repositório quando eu tiver commitado>
cd DTI-DIGITAL
2. Backend
bash
Copiar código
cd Backend
npm install
npm run dev
O servidor estará rodando em http://localhost:3000

3. Frontend
Em outro terminal:

bash
Copiar código
cd Frontend
npm install
npm run dev
A aplicação estará disponível em http://localhost:(verificar no terminal)

Estrutura do Projeto
pgsql
Copiar código
DTI-DIGITAL/
├── Backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── studentController.js
│   │   │   └── gradeController.js
│   │   ├── routes/
│   │   │   ├── studentRoutes.js
│   │   │   └── gradeRoutes.js
│   │   ├── models/
│   │   │   └── database.js
│   │   ├── utils/
│   │   │   └── calculations.js
│   │   └── server.js
│   ├── data/
│   │   └── students.json (gerado automaticamente)
│   ├── package.json
│   └── .env
└── Frontend/
    ├── src/
    │   ├── components/
    │   │   ├── common/
    │   │   │   ├── AlertCard.tsx
    │   │   │   ├── Button.tsx
    │   │   │   └── LoadingSpinner.tsx
    │   │   ├── layout/
    │   │   │   ├── Header.tsx
    │   │   │   └── Layout.tsx
    │   │   └── students/
    │   │       ├── GradeInput.tsx
    │   │       ├── StudentCard.tsx
    │   │       ├── StudentForm.tsx
    │   │       └── StudentTable.tsx
    │   ├── pages/
    │   │   ├── Dashboard.tsx
    │   │   ├── StudentDetail.tsx
    │   │   ├── StudentFormPage.tsx
    │   │   └── StudentList.tsx
    │   ├── services/
    │   │   ├── api.ts
    │   │   └── studentService.ts
    │   ├── context/
    │   │   └── StudentContext.tsx
    │   ├── types/
    │   │   └── index.ts
    │   ├── App.tsx
    │   └── main.tsx
    ├── package.json
    ├── tailwind.config.js
    └── vite.config.ts
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

Premissas Assumidas
Regras de Negócio
Notas: Valores de 0 a 10, permitindo decimais (ex: 7.5)

Frequência: Valores de 0 a 100 (percentual)

Limite de Frequência: Alunos com < 75% precisam de atenção especial

Disciplinas Fixas: Sistema trabalha com 5 disciplinas pré-definidas

Média: Calculada como média aritmética simples das 5 disciplinas

Alunos acima da média: Considerados apenas aqueles com média estritamente maior que a média da turma (não igual)

Persistência de Dados
Dados armazenados em arquivo JSON (Backend/data/students.json)

Arquivo criado automaticamente na primeira execução

Sem necessidade de banco de dados externo

Ideal para ambiente de desenvolvimento e testes

Validações
Nome do aluno é obrigatório

Notas devem estar entre 0 e 10

Frequência deve estar entre 0 e 100

Disciplinas permitidas: apenas as 5 pré-definidas

Decisões de Projeto
Arquitetura: Separação Frontend/Backend, RESTful API, TypeScript no Frontend, Context API

Design Patterns: Component-Based Architecture, Service Layer, Controller Pattern, Utility Functions

UX/UI: Design Responsivo, Feedbacks Visuais, Navegação Intuitiva, Alertas Contextuais

Performance: Lazy Loading, Cálculos no Backend, State Management, Memoization

Testes Manuais Sugeridos
Criar Aluno: Cadastrar aluno com todas as informações

Editar Notas: Atualizar notas e verificar recálculo automático

Frequência Baixa: Criar aluno com frequência < 75% e verificar alerta

Deletar Aluno: Remover aluno e verificar atualização das médias

Alunos Destaque: Criar múltiplos alunos e verificar identificação dos que estão acima da média

Responsividade: Testar em diferentes tamanhos de tela

Possíveis Melhorias Futuras
Autenticação de usuários (professores)

Banco de dados para persistência de dados

Gráficos de desempenho por disciplina

Exportação de relatórios (PDF/Excel)

Sistema de notificações

Histórico de alterações

Testes automatizados (Vitest)

Dark mode

PWA (Progressive Web App)

Filtros e busca avançada

Opção de adicionar matérias

Autor
Gabriel Gonçalves de Almeida
Desenvolvido como parte de processo seletivo

Licença
Este projeto foi desenvolvido para fins educacionais e de avaliação técnica.

Sistema de Gerenciamento de Notas - Mobile
Aplicativo mobile desenvolvido com React Native e Expo para gerenciamento de notas e frequência de alunos.

Tecnologias
React Native

Expo

TypeScript

React Navigation

Axios

Context API

Pré-requisitos
Node.js 18+

Expo CLI

Celular Android/iOS ou emulador

Instalação
bash
Copiar código
cd Mobile
npm install
Configuração
1. Configure o IP do Backend
Edite o arquivo src/services/api.ts e atualize o baseURL:

ts
Copiar código
const api = axios.create({ 
  baseURL: 'http://SEU_IP:3000/api', // Substitua pelo IP da sua máquina
});
Como descobrir seu IP:

bash
Copiar código
# Linux/Mac
ip addr show | grep inet
# ou
ifconfig | grep inet
2. Certifique-se que o Backend está aceitando conexões externas
No arquivo Backend/src/server.js:

js
Copiar código
app.listen(PORT, '0.0.0.0', () => { 
  console.log(`Servidor rodando na porta ${PORT}`); 
});
Execução
Backend (obrigatório estar rodando)
bash
Copiar código
cd Backend
npm run dev
Mobile
bash
Copiar código
cd Mobile
npx expo start
Opções de execução:

Celular físico: Escaneie o QR Code com o app Expo Go

Android Emulator: Pressione a no terminal

iOS Simulator: Pressione i no terminal (apenas Mac)

Estrutura do Projeto
graphql
Copiar código
Mobile/
├── src/
│   ├── @types/          # Tipos TypeScript
│   ├── components/      # Componentes reutilizáveis
│   │   ├── common/      # Componentes comuns (Button, Card, Loading)
│   │   └── students/    # Componentes de estudantes
│   ├── screens/         # Telas do app
│   ├── navigation/      # Configuração de navegação
│   ├── services/        # Serviços de API
│   ├── context/         # Context API
│   └── styles/          # Estilos globais
├── App.tsx
└── package.json
Funcionalidades
Dashboard com estatísticas gerais

Lista de alunos

Detalhes individuais de cada aluno

Cadastro e edição de alunos

Registro de notas (5 disciplinas)

Controle de frequência

Alertas para alunos com frequência baixa

Identificação de alunos acima da média

Telas
Dashboard - Visão geral com cards de estatísticas

Lista de Alunos - Todos os alunos cadastrados

Detalhes do Aluno - Informações completas

Formulário - Cadastro/edição de aluno

Troubleshooting
Erro de conexão com o backend: verifique IP, rede e firewall

Erro ao instalar dependências:

bash
Copiar código
rm -rf node_modules package-lock.json
npm install
App não carrega:

bash
Copiar código
npx expo start --clear
Desenvolvimento
O app usa StyleSheet nativo do React Native para estilização, com cores e espaçamentos centralizados em:

src/styles/colors.ts

src/styles/spacing.ts

Para adicionar novas cores ou espaçamentos, edite esses arquivos.
