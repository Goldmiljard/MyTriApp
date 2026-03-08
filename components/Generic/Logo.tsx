import { StyleSheet, Image, Dimensions } from "react-native";

const Logo = () => {
  return (
    <Image
      source={require("../../assets/images/logo.png")}
      style={styles.logo}
      resizeMode="contain"
    />
  );
};

const window = Dimensions.get("window");

const styles = StyleSheet.create({
  logo: {
    width: window.width * 0.8,          // fill available screen width
    height: undefined,            // allow aspectRatio to control height
    aspectRatio: 1,               // adjust to your logo's ratio if different
    alignSelf: "center",        // horizontally center in parent
  },
});

export default Logo;
