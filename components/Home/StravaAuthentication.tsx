import { makeRedirectUri, useAuthRequest } from "expo-auth-session";
import { useEffect } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { COLORS } from "../../constants";
import { MyText } from "../Generic";
import * as WebBrowser from 'expo-web-browser';
import useAxiosPost from "../../hook/useAxiosPost";

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

  useEffect(() => {
    if (response?.type === "success") {
      const { code } = response.params;
      useAxiosPost("/stravaauthentication", code).then(() => {        
      })
      .catch((error) => {
        alert(error);
      });
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
