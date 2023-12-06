import { StyleSheet, Text, View } from "react-native";
import React, { Component } from "react";
import { SimpleLineIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { COLORS } from "../../constants/Theme";


const LogOutBtn = (handlePress) => {
  return (
    <TouchableOpacity style={styles.logoutBtn} onPress={handlePress.handlePress}>
      <SimpleLineIcons name="logout" size={24} color={COLORS.lightWhite} />
      <Text style={styles.logoutText}>Log out</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  logoutBtn: {
    flex: 1,
    flexDirection: "row",
    gap: 10,
    margin: 10,
    alignItems: "center"
  },
  logoutText: {
    fontFamily: "MontserratBold",
    color: COLORS.lightWhite,
  },
});

export default LogOutBtn;
