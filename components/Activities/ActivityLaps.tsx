import { StyleSheet, View } from "react-native";
import React from "react";
import { COLORS } from "../../constants";
import MyText from "../Generic/MyText";
import ActivityLap from "./ActivityLap";

const ActivityLaps = ({ laps }) => {
  return (   
    <><View style={styles.lapsHeaderRow}>
    <View>
      <MyText style={styles.lapsHeaderText}>Lap</MyText>
    </View>
    <View>
      <MyText style={styles.lapsHeaderText}>Pace</MyText>
    </View>
    <View>
      <MyText style={styles.lapsHeaderText}>HR</MyText>
    </View>
  </View>
  {laps?.map((lap) => (
        <ActivityLap lap={lap} key={`lap-${lap.id}`} />
      ))}
  </>
    
  );
};

const styles = StyleSheet.create({
  lapsHeaderRow: {
    flex: 1,
    marginTop: 10,
    borderTopColor: COLORS.white,
    borderTopWidth: 1,
    width: "80%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "space-between",
  },
  lapsHeaderText: {
    color: COLORS.gray,
  },
});

export default ActivityLaps;
