import { StatusBar } from 'expo-status-bar';
import { StudentProvider } from './src/context/StudentContext';
import { AppNavigator } from './src/navigation/AppNavigator';

export default function App() {
  return (
    <StudentProvider>
      <StatusBar style="light" />
      <AppNavigator />
    </StudentProvider>
  );
}