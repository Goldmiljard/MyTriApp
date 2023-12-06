import React from "react";
import { Text, StyleSheet } from "react-native";
import { FONT } from "../../constants";

const MyText = (props) => {
  if (props.bold === undefined) {
    props.bold = false;
  }
  return (
    <Text
      style={
        props.bold
          ? [styles.boldStyle, props.style]
          : [styles.defaultStyle, props.style]
      }
    >
      {props.children}
    </Text>
  );
}

const styles = StyleSheet.create({
  defaultStyle: {
    fontFamily: FONT.regular,
  },
  boldStyle: {
    fontFamily: FONT.bold,
  },
});

export default MyText;
