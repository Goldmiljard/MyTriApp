import { StyleSheet, Image, Dimensions } from "react-native";

const Logo = () => {
  return (
    <Image source={require("../../assets/images/logo.png")} style={styles.logo} />
  );
};

const window = Dimensions.get("window");

const styles = StyleSheet.create({
  logo: {
    resizeMode: "contain",
    width: window.width * 0.5,
    height: window.width * 0.5,
  },
});

export default Logo;
