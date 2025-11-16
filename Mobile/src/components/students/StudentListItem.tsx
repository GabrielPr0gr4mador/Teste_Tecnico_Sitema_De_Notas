import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Student } from '../../@types';
import { colors } from '../../styles/colors';
import { styles } from './styles.ts/SudentListItem';

interface StudentListItemProps {
  student: Student;
  onPress: () => void;
}

export const StudentListItem = ({ student, onPress }: StudentListItemProps) => {
  const getAttendanceColor = (attendance: number) => {
    return attendance >= 75 ? colors.success : colors.danger;
  };

  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.leftContent}>
        <Text style={styles.name}>{student.name}</Text>
        <Text style={styles.id}>ID: {student.id.slice(0, 8)}</Text>
      </View>

      <View style={styles.rightContent}>
        <View style={styles.stat}>
          <Text style={styles.statLabel}>Média</Text>
          <Text style={styles.average}>{student.average?.toFixed(1) || '0.0'}</Text>
        </View>
        <View style={[styles.attendanceBadge, { backgroundColor: getAttendanceColor(student.attendance) }]}>
          <Text style={styles.attendanceText}>{student.attendance}%</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

