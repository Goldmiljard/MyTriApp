import React from 'react';
import {
  TextInput,
  StyleSheet,
} from 'react-native';

export default function MyTextInput(props) {
  return (
    <TextInput style={[styles.defaultStyle, props.style]} placeholder={props.placeholder} secureTextEntry={props.secureTextEntry} onChangeText={props.onChangeText} value={props.value} autoCapitalize={props.autoCapitalize}>
      {props.children}
    </TextInput>
  );
}

const styles = StyleSheet.create({
  defaultStyle: {
    fontFamily: "MontserratRegular",    
  },
});