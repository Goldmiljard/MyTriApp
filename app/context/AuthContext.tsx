import { createContext, useContext, useEffect, useState } from "react";
import { Platform } from "react-native";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useAxiosPost from "../../hook/useAxiosPost";
import { STRINGS } from "../../constants";

interface IAuthProps {
  authState?: { token: string | null; authenticated: boolean | null };
  onRegister?: (email: string, password: string) => Promise<any>;
  onLogin?: (email: string, password: string) => Promise<any>;
  onLogout?: () => Promise<any>;
}

const AuthContext = createContext<IAuthProps>({});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: any) => {
  const [authState, setAuthState] = useState<{
    token: string | null;
    authenticated: boolean | null;
  }>({
    token: null,
    authenticated: null,
  });

  const getToken = async (key) => {
    if (Platform.OS === "web") {
      return await AsyncStorage.getItem(key);
    } else {
      return await SecureStore.getItemAsync(key);
    }
  };

  const setToken = async (key, value) => {
    if (Platform.OS === "web") {
      return await AsyncStorage.setItem(key, value);
    } else {
      return await SecureStore.setItemAsync(key, value);
    }
  };

  useEffect(() => {
    if (authState.authenticated) {
      return;
    }
    const loadToken = async () => {
      const token = await getToken(STRINGS.jwtTokenKey);

      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        setAuthState({
          token: token,
          authenticated: true,
        });
      }
    };
    loadToken();
  });

  const register = async (email: string, password: string) => {
    try {
      const result = await useAxiosPost("/Auth/register", {
        email: email,
        password: password,
        passwordConfirmation: password,
      });

      return result;
    } catch (e) {
      return { error: true, msg: (e as any).response.data.msg };
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const result = await useAxiosPost("/Auth/login", {
        email: email,
        password: password,
      });

      setAuthState({
        token: result.data,
        authenticated: true,
      });

      axios.defaults.headers.common["Authorization"] = `Bearer ${result.data}`;

      await setToken(STRINGS.jwtTokenKey, result.data);

      return result;
    } catch (error) {
      return { error: true, msg: error.response.status };
    }
  };

  const logout = async () => {
    if (Platform.OS !== "web") {
      await SecureStore.deleteItemAsync(STRINGS.jwtTokenKey);
    } else {
      await AsyncStorage.removeItem(STRINGS.jwtTokenKey);
    }

    axios.defaults.headers.common["Authorization"] = "";

    setAuthState({
      token: null,
      authenticated: false,
    });
  };

  const value = {
    authState,
    onRegister: register,
    onLogin: login,
    onLogout: logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
