import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { COLORS } from "../../constants";
import ActivityLaps from "./ActivityLaps";

const ActivityFooter = ({ activity }) => {
  const [opened, setOpened] = useState(false);

  const openSegments = () => {
    setOpened(!opened);
  };

  return (
    <View style={styles.footerContainer}>
      {opened ? <ActivityLaps laps={activity.laps}></ActivityLaps> : <></>}
      <TouchableOpacity onPress={openSegments}>
        {!opened ? (
          <MaterialIcons
            name="keyboard-arrow-down"
            size={24}
            color={COLORS.lightWhite}
          />
        ) : (
          <MaterialIcons
            name="keyboard-arrow-up"
            size={24}
            color={COLORS.lightWhite}
          />
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    alignItems: "center",
    justifyContent: "flex-end",
  },
});

export default ActivityFooter;
