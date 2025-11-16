import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useStudents } from '../context/StudentContext';
import { Loading } from '../components/common/Loading';
import { Button } from '../components/common/Button';
import { StudentListItem } from '../components/students/StudentListItem';
import { styles } from "./styles/StudentListScreen";


export const StudentListScreen = ({ navigation }: any) => {
  const { students, loading } = useStudents();

  if (loading) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Lista de Alunos</Text>
          <Text style={styles.subtitle}>
            {students.length} {students.length === 1 ? 'aluno cadastrado' : 'alunos cadastrados'}
          </Text>
        </View>
      </View>

      <Button
        title="+ Novo Aluno"
        onPress={() => navigation.navigate('StudentForm')}
        style={styles.addButton}
      />

      {students.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>Nenhum aluno cadastrado</Text>
          <Text style={styles.emptyText}>Comece adicionando seu primeiro aluno</Text>
          <Button
            title="+ Cadastrar Primeiro Aluno"
            onPress={() => navigation.navigate('StudentForm')}
            style={styles.emptyButton}
          />
        </View>
      ) : (
        <FlatList
          data={students}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <StudentListItem
              student={item}
              onPress={() => navigation.navigate('StudentDetail', { studentId: item.id })}
            />
          )}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
};

