import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DashboardScreen } from '../screens/DashboardScreen';
import { StudentListScreen } from '../screens/StudentListScreen';
import { StudentDetailScreen } from '../screens/StudentDetailScreen';
import { StudentFormScreen } from '../screens/StudentFormScreen';
import { colors } from '../styles/colors';

const Stack = createNativeStackNavigator();

export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Dashboard"
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: colors.white,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen
          name="Dashboard"
          component={DashboardScreen}
          options={{ title: 'Sistema de Notas' }}
        />
        <Stack.Screen
          name="StudentList"
          component={StudentListScreen}
          options={{ title: 'Alunos' }}
        />
        <Stack.Screen
          name="StudentDetail"
          component={StudentDetailScreen}
          options={{ title: 'Detalhes do Aluno' }}
        />
        <Stack.Screen
          name="StudentForm"
          component={StudentFormScreen}
          options={({ route }: any) => ({
            title: route.params?.studentId ? 'Editar Aluno' : 'Novo Aluno',
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};