import { View, Text, TextInput, StyleSheet } from 'react-native';
import { colors } from '../../styles/colors';
import { styles } from './styles.ts/GradeInput';

interface GradeInputProps {
  label: string;
  value: number | undefined;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

export const GradeInput = ({ label, value, onChange, min = 0, max = 10 }: GradeInputProps) => {
  const handleChange = (text: string) => {
    const numValue = parseFloat(text.replace(',', '.'));
    if (!isNaN(numValue) && numValue >= min && numValue <= max) {
      onChange(numValue);
    } else if (text === '') {
      onChange(0);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        value={value?.toString() || ''}
        onChangeText={handleChange}
        keyboardType="numeric"
        placeholder={`${min} - ${max}`}
        placeholderTextColor={colors.gray400}
      />
      <Text style={styles.hint}>Nota de {min} a {max}</Text>
    </View>
  );
};

