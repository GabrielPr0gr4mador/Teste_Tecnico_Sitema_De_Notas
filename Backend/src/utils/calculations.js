// Calcular média das notas de um aluno
export const calculateStudentAverage = (grades) => {
  if (!grades || Object.keys(grades).length === 0) return 0; // Se não tiver matérias 
  const values = Object.values(grades); // 
  const sum = values.reduce((acc, grade) => acc + grade, 0); // grade representa a nota e acc acumula a anterior 
  return Number((sum / values.length).toFixed(2)); // values retorna um array com as notas === soma de todas a notas dividido pela quantidade de notas = a média 
};

// Calcular média da turma por disciplina
export const calculateClassAverageByDiscipline = (students) => {
  const disciplines = ['matematica', 'portugues', 'economia', 'historia', 'geografia'];
  const averages = {};

  disciplines.forEach(discipline => { //para cada disciplina vamos fazer essa lógica
    const grades = students // grades vai ser igual a quantidade de estudantes 
      .map(student => student.grades?.[discipline]) // pega uma disciplina de grade
      .filter(grade => grade !== undefined && grade !== null); //verifica se materias
    
    if (grades.length > 0) { // se tiver matérias calcula a média 
      const sum = grades.reduce((acc, grade) => acc + grade, 0); // soma da nota de cada aluno na materia
      averages[discipline] = Number((sum / grades.length).toFixed(2)); //calcula a media 
    } else {
      averages[discipline] = 0; // se não passar no if não vai calcular nada
    }
  });

  return averages;
};

// Calcular média geral da turma
export const calculateClassGeneralAverage = (students) => { 
  if (students.length === 0) return 0; // se não houver alunos retorna 0 
  
  const sum = students.reduce((acc, student) => {
    return acc + calculateStudentAverage(student.grades); // acumulador soma a média de cada aluno calculada com a função calculateStudentAverage
  }, 0);
  
  return Number((sum / students.length).toFixed(2)); // calcula soma de notas de cada aluno dividida pela quantidade de alunos
};


// Filtrar alunos acima da média
export const getStudentsAboveAverage = (students) => {
  const classAverage = calculateClassGeneralAverage(students);
  
  return students
    .filter(student => calculateStudentAverage(student.grades) > classAverage)
    .map(student => ({
      ...student,
      average: calculateStudentAverage(student.grades),
      classAverage
    })); //filtra alunos que tem a média maior que a média da turma 
};

// Filtrar alunos com frequência baixa (< 75%)
export const getStudentsLowAttendance = (students) => {
  return students
    .filter(student => student.attendance < 75)
    .map(student => ({
      ...student,
      average: calculateStudentAverage(student.grades)
    }));
};