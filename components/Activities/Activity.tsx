import { StyleSheet, Text, View } from "react-native";
import { COLORS, DISTANCE, TIME } from "../../constants";
import { LinearGradient } from "expo-linear-gradient";
import ActivityHeader from "./ActivityHeader";
import ActivityFooter from "./ActivityFooter";
import StatHR from "./StatHR";
import { MyText } from "../Generic";
import StatPace from "./StatPace";

const Activity = ({ activity }) => {
  const activityTime = () => {
    let hours = Math.floor(activity.elapsedTime / TIME.minutesPerHour);
    let minutes = Math.floor(
      (activity.elapsedTime % TIME.minutesPerHour) / TIME.minutesPerHour
    );
    let seconds = activity.elapsedTime % TIME.secondsPerHour;

    return (
      <MyText style={styles.statsData}>
        {hours}:{minutes.toString().padStart(2, "0")}:
        {seconds.toString().padStart(2, "0")}
      </MyText>
    );
  };

  const activityDistance = () => {
    return (
      <MyText style={styles.distanceNumber}>
        {activity.distance > DISTANCE.metersPerKilometer
          ? (activity.distance / DISTANCE.metersPerKilometer).toFixed(2)
          : activity.distance.toFixed(0)}
        <MyText style={styles.distanceDescriptor}>
          {activity.distance > DISTANCE.metersPerKilometer ? "km" : "m"}
        </MyText>
      </MyText>
    );
  };

  const activityWatts = () => {
    return (
      <MyText style={styles.statsData}>
        {activity.averageWatts !== 0 ? activity.averageWatts.toFixed(0) : "N/A"}
      </MyText>
    );
  };

  return (
    <LinearGradient
      colors={[COLORS.backgroundStart, COLORS.backgroundEnd]}
      style={styles.background}
    >
      <View style={styles.activity}>
        <ActivityHeader activity={activity}></ActivityHeader>
        <View style={styles.activityRow2}>
          <View style={styles.distance}>{activityDistance()}</View>
          <View style={styles.statsContainer}>
            <View style={styles.statsRow1}>
              <MyText style={styles.statsLabel}>Time</MyText>
              {activityTime()}
              <MyText style={styles.statsLabel}>HR</MyText>
              <StatHR
                style={styles.statsData}
                averageHeartrate={activity.averageHeartrate}
              />
            </View>
            <View style={styles.statsRow2}>
              <MyText style={styles.statsLabel}>Pace</MyText>
              <StatPace
                style={styles.statsData}
                averageSpeed={activity.averageSpeed}
              />
              <MyText style={styles.statsLabel}>Watts</MyText>
              {activityWatts()}
            </View>
          </View>
        </View>
        <ActivityFooter activity={activity}></ActivityFooter>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  activity: {
    flex: 1,
    borderRadius: 10,
  },
  background: {
    borderWidth: 1,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
    borderRadius: 10,
  },
  activityRow2: {
    flex: 3,
    flexDirection: "row",
  },
  distance: {
    flex: 3,
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 15,
  },
  distanceNumber: {
    flex: 1,
    fontSize: 35,
    textAlign: "center",
    color: COLORS.lightWhite,
  },
  distanceDescriptor: {
    fontSize: 15,
    flex: 1,
    color: COLORS.lightWhite,
  },
  statsContainer: {
    flex: 5,
  },
  statsRow1: {
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
  },
  statsLabel: {
    textAlign: "left",
    flex: 2,
    margin: 2,
    fontSize: 14,
    color: COLORS.gray,
  },
  statsData: {
    textAlign: "left",
    flex: 2,
    margin: 2,
    fontSize: 13,
    color: COLORS.lightWhite,
  },
  statsRow2: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
});

export default Activity;
