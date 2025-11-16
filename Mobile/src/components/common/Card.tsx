import { View, StyleSheet, ViewProps } from 'react-native';
import { styles } from './styles.ts/Card';

interface CardProps extends ViewProps {
  children: React.ReactNode;
}

export const Card = ({ children, style, ...props }: CardProps) => {
  return (
    <View style={[styles.card, style]} {...props}>
      {children}
    </View>
  );
};

