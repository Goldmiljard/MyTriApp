import { StyleSheet, SafeAreaView, ActivityIndicator } from "react-native";
import { COLORS } from "../../constants";
import { MyText } from "../../components/Generic/";
import StravaAuthentication from "../../components/Home/StravaAuthentication";
import Logo from "../../components/Generic/Logo";
import useAxiosGet from "../../hook/useAxiosGet";

export default function Home() {
  const {data, isLoading, error } = useAxiosGet("/StravaAuthentication");

  return (
    <SafeAreaView style={styles.container}>
      <Logo></Logo>
      <MyText bold={true} style={styles.homeText}>
        Welcome to My Tri!
      </MyText>
      {isLoading ? (
          <ActivityIndicator size="large" color={COLORS.orange} />
        ) : error ? (
          <MyText>Something went wrong in loading your Strava authentication status</MyText>
        ) : !data ? (
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
