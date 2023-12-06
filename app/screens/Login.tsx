import {
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { ActivityIndicator } from "react-native";
import { COLORS } from "../../constants";
import { SafeAreaView } from "react-native-safe-area-context";
import MyText from "../../components/Generic/MyText";
import MyTextInput from "../../components/Generic/MyTextInput";
import Logo from "../../components/Generic/Logo";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { onLogin, onRegister } = useAuth();
  const [logging, setLogging] = useState(false);
  const [registering, setRegistering] = useState(false);

  const login = async () => {
    setLogging(true);
    const result = await onLogin(email, password).then()
    if (result && result.error) {
      setLogging(false);
      alert(result.msg);
    }
  };

  const register = async () => {
    setRegistering(true);
    const result = await onRegister(email, password);
    if (result && result.error) {
      setRegistering(false);
      alert(result.msg);
    } else {
      login();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Logo></Logo>
      <MyTextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(text: string) => setEmail(text)}
        autoCapitalize="none"
        value={email}
      />
      <MyTextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={(text: string) => setPassword(text)}
        autoCapitalize="none"
        value={password}
      />
      <TouchableOpacity style={styles.signIn} onPress={login}>
        <MyText>Login</MyText>
        {logging ? (
          <ActivityIndicator
            size="small"
            color={COLORS.darkGray}
            style={styles.spinner}
          ></ActivityIndicator>
        ) : (
          <></>
        )}
      </TouchableOpacity>
      <TouchableOpacity style={styles.register} onPress={register}>
        <MyText>Register</MyText>
        {registering ? (
          <ActivityIndicator
            size="small"
            color={COLORS.darkGray}
            style={styles.spinner}
          ></ActivityIndicator>
        ) : (
          <></>
        )}
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const window = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.darkGray,
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 20,
  },
  logo: {
    resizeMode: "contain",
    width: window.width * 0.5,
    height: window.width * 0.5,
  },
  input: {
    height: 50,
    width: "60%",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    backgroundColor: COLORS.transparentWhite,
  },
  register: {
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    borderRadius: 10,
    width: "60%",
    backgroundColor: COLORS.blue,
  },
  signIn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    borderRadius: 10,
    width: "60%",
    backgroundColor: COLORS.green,
  },
  spinner: {
    position: "absolute",
    right: 20,
    marginLeft: 50,
  },
});

export default Login;
