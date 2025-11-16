import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { Student } from '../@types';
import { getStudentById, deleteStudent } from '../services/studentService';
import { useStudents } from '../context/StudentContext';
import { Loading } from '../components/common/Loading';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { colors } from '../styles/colors';
import { styles } from './styles/StudentDetailScreen';

export const StudentDetailScreen = ({ route, navigation }: any) => {
  const { studentId } = route.params;
  const { removeStudent, fetchStudents } = useStudents();
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    loadStudent();
  }, [studentId]);

  const loadStudent = async () => {
    try {
      setLoading(true);
      const data = await getStudentById(studentId);
      setStudent(data);
    } catch (error) {
      console.error('Erro ao carregar aluno:', error);
      Alert.alert('Erro', 'Não foi possível carregar os dados do aluno');
      navigation.goBack();
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = () => {
    Alert.alert(
      'Confirmar exclusão',
      'Tem certeza que deseja deletar este aluno?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Deletar',
          style: 'destructive',
          onPress: async () => {
            try {
              setDeleting(true);
              await deleteStudent(studentId);
              removeStudent(studentId);
              await fetchStudents();
              Alert.alert('Sucesso', 'Aluno deletado com sucesso');
              navigation.goBack();
            } catch (error) {
              console.error('Erro ao deletar aluno:', error);
              Alert.alert('Erro', 'Não foi possível deletar o aluno');
            } finally {
              setDeleting(false);
            }
          },
        },
      ]
    );
  };

  if (loading) {
    return <Loading />;
  }

  if (!student) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Aluno não encontrado</Text>
      </View>
    );
  }

  const getAttendanceColor = (attendance: number) => {
    return attendance >= 75 ? colors.success : colors.danger;
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Card style={styles.headerCard}>
        <Text style={styles.name}>{student.name}</Text>
        <Text style={styles.id}>ID: {student.id}</Text>
      </Card>

      <View style={styles.statsRow}>
        <Card style={styles.statCard}>
          <Text style={styles.statLabel}>Média Geral</Text>
          <Text style={[styles.statValue, { color: colors.success }]}>
            {student.average?.toFixed(1) || '0.0'}
          </Text>
        </Card>

        <Card style={[styles.statCard, { borderLeftWidth: 4, borderLeftColor: getAttendanceColor(student.attendance) }]}>
          <Text style={styles.statLabel}>Frequência</Text>
          <Text style={[styles.statValue, { color: getAttendanceColor(student.attendance) }]}>
            {student.attendance}%
          </Text>
        </Card>
      </View>

      <Card style={styles.gradesCard}>
        <Text style={styles.sectionTitle}>Notas por Disciplina</Text>
        {Object.entries(student.grades).map(([subject, grade]) => (
          <View key={subject} style={styles.gradeRow}>
            <Text style={styles.gradeSubject}>{subject.charAt(0).toUpperCase() + subject.slice(1)}</Text>
            <Text style={styles.gradeValue}>{grade?.toFixed(1) || '-'}</Text>
          </View>
        ))}
      </Card>

      {student.attendance < 75 && (
        <Card style={[styles.alertCard, { borderLeftColor: colors.warning }]}>
          <Text style={styles.alertText}>
            Atenção: Este aluno possui frequência abaixo de 75% e precisa de acompanhamento especial.
          </Text>
        </Card>
      )}

      <View style={styles.actions}>
        <Button
          title="Editar"
          variant="secondary"
          onPress={() => navigation.navigate('StudentForm', { studentId: student.id })}
          style={styles.actionButton}
        />
        <Button
          title="Deletar"
          variant="danger"
          onPress={handleDelete}
          loading={deleting}
          style={styles.actionButton}
        />
      </View>

      {student.createdAt && (
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Cadastrado em: {new Date(student.createdAt).toLocaleDateString('pt-BR')}
          </Text>
          {student.updatedAt && (
            <Text style={styles.footerText}>
              Última atualização: {new Date(student.updatedAt).toLocaleDateString('pt-BR')}
            </Text>
          )}
        </View>
      )}
    </ScrollView>
  );
};

