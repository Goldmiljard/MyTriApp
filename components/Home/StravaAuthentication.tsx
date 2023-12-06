import axios from "axios";
import { makeRedirectUri, useAuthRequest } from "expo-auth-session";
import { discovery } from "expo-auth-session/build/providers/Google";
import { useEffect } from "react";
import Constants from "expo-constants";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { COLORS } from "../../constants";
import { MyText } from "../Generic";
import * as WebBrowser from 'expo-web-browser';

const StravaAuthentication = () => {
WebBrowser.maybeCompleteAuthSession();
  // Endpoint
  const discovery = {
    authorizationEndpoint: "https://www.strava.com/oauth/mobile/authorize",
    tokenEndpoint: "https://www.strava.com/oauth/token",
    revocationEndpoint: "https://www.strava.com/oauth/deauthorize",
  };
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: "111830",
      scopes: ["activity:read_all"],
      redirectUri: makeRedirectUri({
        // the "redirect" must match your "Authorization Callback Domain" in the Strava dev console.
        native: `my-tri-app://activities`,
      }),
    },
    discovery
  );

  const API_URL = Constants?.expoConfig?.hostUri
    ? "https://absolute-primary-sponge.ngrok-free.app/api"
    : "https://mytricareer-api.azurewebsites.net/api";

  const saveStravaAuthentication = async (code) => {
    const url = `${API_URL}/stravaauthentication?code=${code}`;
    const result = await axios.post(url);
  };

  useEffect(() => {
    if (response?.type === "success") {
      const { code } = response.params;
      saveStravaAuthentication(code);
    }
  }, [response]);

  return (
    <View style={styles.container}>
      <MyText style={styles.stravaText}>Click the button below to authenticate and connect this app with your Strava account</MyText>
      <TouchableOpacity
        style={styles.stravaAuthenticateButton}
        onPress={() => {
          promptAsync();
        }}
      >
        <MyText style={styles.buttonText}>Connect to Strava</MyText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.black,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  stravaText: {
    color: COLORS.white,
    textAlign: "center",
  },
  stravaAuthenticateButton: {
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    width: 150,
    borderRadius: 10,
    backgroundColor: COLORS.orange,
  },
  buttonText: {
    fontFamily: "MontserratBold",
    color: COLORS.white,
  },
});

export default StravaAuthentication;
