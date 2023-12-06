import { createContext, useContext, useEffect, useState } from "react";
import { Platform } from "react-native";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";

interface IAuthProps {
  authState?: { token: string | null; authenticated: boolean | null };
  onRegister?: (email: string, password: string) => Promise<any>;
  onLogin?: (email: string, password: string) => Promise<any>;
  onLogout?: () => Promise<any>;
}

const TOKEN_KEY = "my-jwt"; //this is not the key used to generate the JWT, just key for storage
//const API_URL = "https://192.168.178.43:44397/api"//"https://mytricareer-api.azurewebsites.net/api";
const AuthContext = createContext<IAuthProps>({});

const API_URL = Constants?.expoConfig?.hostUri
  ? "https://absolute-primary-sponge.ngrok-free.app/api"
  : "https://mytricareer-api.azurewebsites.net/api";

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
      const token = await getToken(TOKEN_KEY);

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
      const options = {
        method: "POST",
        url: `${API_URL}/Auth/register`,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: {
          email: email,
          password: password,
          passwordConfirmation: password,
        },
      };
      
      const result = await axios.post(options.url, options.body);

      return result;
    } catch (e) {
      return { error: true, msg: (e as any).response.data.msg };
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const options = {
        method: "POST",
        url: `${API_URL}/Auth/login`,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: {
          email: email,
          password: password,
        },
      };

      const result = await axios.post(options.url, options.body);

      setAuthState({
        token: result.data,
        authenticated: true,
      });

      axios.defaults.headers.common["Authorization"] = `Bearer ${result.data}`;

      await setToken(TOKEN_KEY, result.data);

      return result;
    } catch (error) {
      return { error: true, msg: error.response.status };
    }
  };

  const logout = async () => {
    if (Platform.OS !== "web") {
      await SecureStore.deleteItemAsync(TOKEN_KEY);
    }
    else {      
      await AsyncStorage.removeItem(TOKEN_KEY);
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
