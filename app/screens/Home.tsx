import { StyleSheet, SafeAreaView } from "react-native";
import { COLORS } from "../../constants";
import { MyText } from "../../components/Generic/";
import StravaAuthentication from "../../components/Home/StravaAuthentication";
import Logo from "../../components/Generic/Logo";
import { useEffect, useState } from "react";
import useFetch from "../../hook/useFetch";

export default function Home() {
  const [isStravaAuthenticated, setStravaAuthenticated] = useState(false);

  useEffect(() => {
    useFetch("/StravaAuthentication", "GET")
      .then((response) => {
        console.log(response.data);
        setStravaAuthenticated(response.data);
      })
      .catch((error) => {
        alert(error);
      });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Logo></Logo>
      <MyText bold={true} style={styles.homeText}>
        Welcome to My Tri!
      </MyText>
      {!isStravaAuthenticated ? (
        <StravaAuthentication></StravaAuthentication>
      ) : (
        <></>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.black,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  homeText: {
    color: COLORS.white,
    textAlign: "center",
  },
});
