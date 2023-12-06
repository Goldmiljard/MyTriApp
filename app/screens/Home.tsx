import { StyleSheet, SafeAreaView } from "react-native";
import { COLORS } from "../../constants";
import { MyText } from "../../components/Generic/";
import StravaAuthentication from "../../components/Home/StravaAuthentication";
import Logo from "../../components/Generic/Logo";

export default function Home() {
  return (
    <SafeAreaView style={styles.container}>
      <Logo></Logo>
      <MyText bold={true} style={styles.homeText}>
        Welcome to My Tri!
      </MyText>
      <StravaAuthentication></StravaAuthentication>
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
