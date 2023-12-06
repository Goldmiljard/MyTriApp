import { StyleSheet, View } from "react-native";
import MyText from "../Generic/MyText";
import { COLORS } from "../../constants";
import StatPace from "./StatPace";
import StatHR from "./StatHR";

const ActivityLap = ({ lap }) => {
  return (
    <View style={styles.lapContainer}>
      <View>
        <MyText style={styles.lapStats}>{lap.name}</MyText>
      </View>
      <View>
        <StatPace averageSpeed={lap.averageSpeed}></StatPace>
      </View>
      <View>
        <StatHR style={styles.lapStats} averageHeartrate={lap.averageHeartrate}></StatHR>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  lapContainer: {
    flex: 1,
    marginTop: 10,
    borderTopColor: COLORS.gray,
    borderTopWidth: 1,
    width: "80%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  lapStats: {
    color: COLORS.white,
  },
});

export default ActivityLap;
