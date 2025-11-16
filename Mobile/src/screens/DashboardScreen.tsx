import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useStudents } from '../context/StudentContext';
import { Loading } from '../components/common/Loading';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { Student } from '../@types';
import { getStudentsAboveAverage, getStudentsLowAttendance } from '../services/studentService';
import { colors } from '../styles/colors';
import { styles } from './styles/DashboardScreen';

export const DashboardScreen = ({ navigation }: any) => {
  const { students, classGeneralAverage, loading } = useStudents();
  const [studentsAbove, setStudentsAbove] = useState<Student[]>([]);
  const [studentsLow, setStudentsLow] = useState<Student[]>([]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const [above, low] = await Promise.all([
          getStudentsAboveAverage(),
          getStudentsLowAttendance(),
        ]);
        setStudentsAbove(above);
        setStudentsLow(low);
      } catch (error) {
        console.error('Erro ao buscar relatórios:', error);
      }
    };

    if (students.length > 0) {
      fetchReports();
    }
  }, [students]);

  if (loading) {
    return <Loading />;
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>Dashboard</Text>
        <Text style={styles.subtitle}>Visão geral do sistema</Text>
      </View>

      <Button
        title="+ Novo Aluno"
        onPress={() => navigation.navigate('StudentForm')}
        style={styles.addButton}
      />

      <View style={styles.statsGrid}>
        <Card style={styles.statCard}>
          <Text style={styles.statLabel}>Total de Alunos</Text>
          <Text style={[styles.statValue, { color: colors.info }]}>{students.length}</Text>
        </Card>

        <Card style={styles.statCard}>
          <Text style={styles.statLabel}>Média da Turma</Text>
          <Text style={[styles.statValue, { color: colors.success }]}>
            {classGeneralAverage.toFixed(1)}
          </Text>
        </Card>

        <Card style={styles.statCard}>
          <Text style={styles.statLabel}>Acima da Média</Text>
          <Text style={[styles.statValue, { color: colors.success }]}>{studentsAbove.length}</Text>
        </Card>

        <Card style={styles.statCard}>
          <Text style={styles.statLabel}>Frequência Baixa</Text>
          <Text style={[styles.statValue, { color: colors.warning }]}>{studentsLow.length}</Text>
        </Card>
      </View>

      {studentsLow.length > 0 && (
        <Card style={[styles.alertCard, { borderLeftColor: colors.warning }]}>
          <Text style={styles.alertTitle}>Alunos com Frequência Baixa</Text>
          <Text style={styles.alertText}>
            {studentsLow.length} {studentsLow.length === 1 ? 'aluno precisa' : 'alunos precisam'} de atenção
          </Text>
          <Button
            title="Ver Detalhes"
            variant="secondary"
            onPress={() => navigation.navigate('StudentList')}
            style={styles.alertButton}
          />
        </Card>
      )}

      {studentsAbove.length > 0 && (
        <Card style={[styles.alertCard, { borderLeftColor: colors.success }]}>
          <Text style={styles.alertTitle}>Alunos Destaque</Text>
          <Text style={styles.alertText}>
            {studentsAbove.length} {studentsAbove.length === 1 ? 'aluno está' : 'alunos estão'} acima da média
          </Text>
        </Card>
      )}

      {students.length === 0 && (
        <Card style={styles.emptyCard}>
          <Text style={styles.emptyTitle}>Nenhum aluno cadastrado</Text>
          <Text style={styles.emptyText}>Comece adicionando seu primeiro aluno</Text>
          <Button
            title="+ Cadastrar Primeiro Aluno"
            onPress={() => navigation.navigate('StudentForm')}
            style={styles.emptyButton}
          />
        </Card>
      )}
    </ScrollView>
  );
};

