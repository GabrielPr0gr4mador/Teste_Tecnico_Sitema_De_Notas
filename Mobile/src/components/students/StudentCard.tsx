import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Card } from '../common/Card';
import { Student } from '../../@types';
import { colors } from '../../styles/colors';
import { styles } from './styles.ts/StudentCard';

interface StudentCardProps {
  student: Student;
  onPress: () => void;
}

export const StudentCard = ({ student, onPress }: StudentCardProps) => {
  const getAttendanceColor = (attendance: number) => {
    return attendance >= 75 ? colors.success : colors.danger;
  };

  const getAverageColor = (average: number) => {
    if (average >= 7) return colors.success;
    if (average >= 5) return colors.warning;
    return colors.danger;
  };

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <Card style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.name}>{student.name}</Text>
          <Text style={styles.id}>ID: {student.id.slice(0, 8)}</Text>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Média</Text>
            <Text style={[styles.statValue, { color: getAverageColor(student.average || 0) }]}>
              {student.average?.toFixed(1) || '0.0'}
            </Text>
          </View>

          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Frequência</Text>
            <Text style={[styles.statValue, { color: getAttendanceColor(student.attendance) }]}>
              {student.attendance}%
            </Text>
          </View>
        </View>

        <View style={styles.gradesContainer}>
          <Text style={styles.gradesLabel}>Notas:</Text>
          <View style={styles.gradesRow}>
            {Object.entries(student.grades).map(([subject, grade]) => (
              <View key={subject} style={styles.gradeItem}>
                <Text style={styles.gradeSubject}>{subject.slice(0, 3).toUpperCase()}</Text>
                <Text style={styles.gradeValue}>{grade?.toFixed(1) || '-'}</Text>
              </View>
            ))}
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );
};

