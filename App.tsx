import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "react-native";
import { AuthProvider } from "./app/context/AuthContext";
import Layout from "./app/Layout";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
  const isDarkMode = useColorScheme() === "dark";

  return (
    <SafeAreaProvider>
      <AuthProvider>
        <Layout></Layout>
      </AuthProvider>
      <StatusBar
        style={isDarkMode ? "light" : "dark"}
        backgroundColor={isDarkMode ? "#000000" : "#FFFFFF"}
      />
    </SafeAreaProvider>
  );
}
