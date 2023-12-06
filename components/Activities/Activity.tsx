import { StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import { FONT, COLORS } from "../../constants";
import { LinearGradient } from "expo-linear-gradient";
import ActivityHeader from "./ActivityHeader";
import ActivityFooter from "./ActivityFooter";
import StatHR from "./StatHR";

const Activity = ({ activity }) => {
  const SECONDS_PER_HOUR = 3600;
  const SECONDS_PER_MINUTE = 60;
  const METERS_PER_KM = 1000;

  const activityTime = () => {
    let hours = Math.floor(activity.elapsedTime / SECONDS_PER_HOUR);
    let minutes = Math.floor((activity.elapsedTime % SECONDS_PER_HOUR) / SECONDS_PER_MINUTE);
    let seconds = activity.elapsedTime % SECONDS_PER_MINUTE;

    return (
      <Text style={styles.statsData}>
        {hours}:{minutes.toString().padStart(2, "0")}:
        {seconds.toString().padStart(2, "0")}
      </Text>
    );
  };

  const activityDistance = () => {
    return (
      <Text style={styles.distanceNumber}>
        {activity.distance > METERS_PER_KM
          ? (activity.distance / METERS_PER_KM).toFixed(2)
          : activity.distance.toFixed(0)}
        <Text style={styles.distanceDescriptor}>
          {activity.distance > METERS_PER_KM ? "km" : "m"}
        </Text>
      </Text>
    );
  };

  const activityWatts = () => {
    return (
      <Text style={styles.statsData}>
        {activity.averageWatts !== 0 ? activity.averageWatts.toFixed(0) : "N/A"}
      </Text>
    );
  };

  const activityPace = () => {
    const paceMinutes = Math.floor(METERS_PER_KM / activity.averageSpeed / SECONDS_PER_MINUTE).toFixed(
      0
    );
    const paceSeconds = Math.round((METERS_PER_KM / activity.averageSpeed) % SECONDS_PER_MINUTE)
      .toFixed(0)
      .padStart(2, "0");

    return (
      <Text style={styles.statsData}>
        {paceMinutes}:{paceSeconds}/ K
      </Text>
    );
  };


  return (
    <LinearGradient
        // Background Linear Gradient
        colors={[COLORS.backgroundStart, COLORS.backgroundEnd]}
        style={styles.background}>     
    <View style={styles.activity}>
        <ActivityHeader activity={activity}></ActivityHeader> 
        <View style={styles.activityRow2}>                    
          <View style={styles.distance}>{activityDistance()}</View>
          <View style={styles.statsContainer}>
            <View style={styles.statsRow1}>
              <Text style={styles.statsLabel}>Time</Text>
              {activityTime()}
              <Text style={styles.statsLabel}>HR</Text>
              <StatHR style={styles.statsData} averageHeartrate={activity.averageHeartrate}></StatHR>
            </View>
            <View style={styles.statsRow2}>
              <Text style={styles.statsLabel}>Pace</Text>
              {activityPace()}
              <Text style={styles.statsLabel}>Watts</Text>
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
    fontFamily: FONT.regular,
    fontSize: 35,
    textAlign: "center",
    color: COLORS.lightWhite,
  },
  distanceDescriptor: {
    fontSize: 15,
    fontFamily: FONT.regular,
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
    fontFamily: FONT.regular,
    textAlign: "left",
    flex: 2,
    margin: 2,
    fontSize: 14,
    color: COLORS.gray,
  },
  statsData: {
    fontFamily: FONT.regular,
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
