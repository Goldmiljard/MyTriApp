import React from "react";
import { Text, StyleSheet } from "react-native";
import { FONT } from "../../constants";

const MyText = (props) => {
  // avoid mutating props - they are frozen in strict mode
  const { bold = false, style, children, ...rest } = props;
  return (
    <Text
      style={
        bold ? [styles.boldStyle, style] : [styles.defaultStyle, style]
      }
      {...rest}
    >
      {children}
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
