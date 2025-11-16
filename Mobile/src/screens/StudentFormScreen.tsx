import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Alert } from 'react-native';
import { StudentFormData, Grades } from '../@types';
import { createStudent, updateStudent, getStudentById } from '../services/studentService';
import { useStudents } from '../context/StudentContext';
import { Loading } from '../components/common/Loading';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { GradeInput } from '../components/students/GradeInput';
import { colors } from '../styles/colors';
import { styles } from "./styles/StudentFormScreen";

export const StudentFormScreen = ({ route, navigation }: any) => {
  const studentId = route.params?.studentId;
  const isEditing = !!studentId;
  
  const { addStudent, updateStudentInList, fetchStudents } = useStudents();
  
  const [name, setName] = useState('');
  const [attendance, setAttendance] = useState('0');
  const [grades, setGrades] = useState<Grades>({
    matematica: 0,
    portugues: 0,
    economia: 0,
    historia: 0,
    geografia: 0,
  });
  
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEditing);

  useEffect(() => {
    if (isEditing) {
      loadStudent();
    }
  }, [studentId]);

  const loadStudent = async () => {
    try {
      setFetching(true);
      const student = await getStudentById(studentId);
      setName(student.name);
      setAttendance(student.attendance.toString());
      setGrades(student.grades);
    } catch (error) {
      console.error('Erro ao carregar aluno:', error);
      Alert.alert('Erro', 'Não foi possível carregar os dados do aluno');
      navigation.goBack();
    } finally {
      setFetching(false);
    }
  };

  const handleSubmit = async () => {
    if (!name.trim()) {
      Alert.alert('Atenção', 'O nome do aluno é obrigatório');
      return;
    }

    const attendanceValue = parseFloat(attendance);
    if (isNaN(attendanceValue) || attendanceValue < 0 || attendanceValue > 100) {
      Alert.alert('Atenção', 'A frequência deve estar entre 0 e 100');
      return;
    }

    try {
      setLoading(true);
      const data: StudentFormData = {
        name: name.trim(),
        grades,
        attendance: attendanceValue,
      };

      if (isEditing) {
        const updated = await updateStudent(studentId, data);
        updateStudentInList(updated);
        await fetchStudents();
        Alert.alert('Sucesso', 'Aluno atualizado com sucesso');
      } else {
        const created = await createStudent(data);
        addStudent(created);
        await fetchStudents();
        Alert.alert('Sucesso', 'Aluno cadastrado com sucesso');
      }

      navigation.goBack();
    } catch (error) {
      console.error('Erro ao salvar aluno:', error);
      Alert.alert('Erro', 'Não foi possível salvar o aluno. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const updateGrade = (subject: keyof Grades, value: number) => {
    setGrades(prev => ({ ...prev, [subject]: value }));
  };

  if (fetching) {
    return <Loading text="Carregando dados..." />;
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>{isEditing ? 'Editar Aluno' : 'Novo Aluno'}</Text>
      <Text style={styles.subtitle}>
        {isEditing ? 'Atualize as informações do aluno' : 'Preencha os dados do novo aluno'}
      </Text>

      <Card style={styles.section}>
        <Text style={styles.sectionTitle}>Informações Básicas</Text>
        
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Nome do Aluno *</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Digite o nome completo"
            placeholderTextColor={colors.gray400}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Frequência (%)</Text>
          <TextInput
            style={styles.input}
            value={attendance}
            onChangeText={setAttendance}
            placeholder="0 - 100"
            placeholderTextColor={colors.gray400}
            keyboardType="numeric"
          />
          <Text style={styles.hint}>Porcentagem de presença (0 a 100%)</Text>
        </View>
      </Card>

      <Card style={styles.section}>
        <Text style={styles.sectionTitle}>Notas por Disciplina</Text>
        
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
      </Card>

      <View style={styles.actions}>
        <Button
          title={isEditing ? 'Salvar Alterações' : 'Cadastrar Aluno'}
          onPress={handleSubmit}
          loading={loading}
          style={styles.submitButton}
        />
        <Button
          title="Cancelar"
          variant="secondary"
          onPress={() => navigation.goBack()}
          disabled={loading}
        />
      </View>
    </ScrollView>
  );
};

