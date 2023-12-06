import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../constants";

const ActivityHeader = ({ activity }) => {
  const activityTitle = (activity) => {
    switch (activity.sportType) {
      case "Run":
        return (
          <View style={styles.titleContainer}>
            <FontAwesome5
              style={styles.titleIcon}
              name="running"
              size={32}
              color={COLORS.green}
            />
            <Text style={{ color: COLORS.green }}>{activity.name}</Text>
          </View>
        );
      case "Ride":
      case "VirtualRide":
        return (
          <View style={styles.titleContainer}>
            <Ionicons
              style={styles.titleIcon}
              name="bicycle-sharp"
              size={32}
              color={COLORS.yellow}
            />
            <Text style={{ color: COLORS.yellow }}>{activity.name}</Text>
          </View>
        );
      case "Swim":
        return (
          <View style={styles.titleContainer}>
            <FontAwesome5
              style={styles.titleIcon}
              name="swimmer"
              size={32}
              color={COLORS.green}
            />
            <Text style={{ color: COLORS.blue }}>{activity.name}</Text>
          </View>
        );
    }
  };

  const activityWeather = () => {
    const max = 27;
    const min = 13;
    const randomTemp = Math.floor(Math.random() * (max - min + 1)) + min;

    return (
      <View style={styles.weatherContainer}>
        {randomTemp > 20 ? (
          <Ionicons name="md-sunny-outline" size={32} color="yellow" />
        ) : randomTemp < 15 ? (
          <Ionicons name="md-rainy-outline" size={32} color="lightblue" />
        ) : (
          <Ionicons name="md-cloudy-outline" size={32} color="gray" />
        )}

        <Text style={styles.weatherText}>{randomTemp} °C</Text>
      </View>
    );
  };

  return (
    <View style={styles.activityRow1}>
      {activityTitle(activity)}
      {activityWeather()}
    </View>
  );
};

const styles = StyleSheet.create({
  activityRow1: {
    marginTop: 10,
    flex: 2,
    flexDirection: "row",
  },
  titleContainer: {
    flex: 2,
    flexDirection: "row",
    alignItems: "center",
  },
  titleIcon: {
    marginLeft: 20,
    marginRight: 10,
  },
  titleText: {
    textAlign: "left",
    fontSize: 20,
    color: COLORS.green,
    fontFamily: "MontserratBold",
  },
  titleTextSwim: {
    textAlign: "left",
    fontSize: 20,
    color: COLORS.blue,
    fontFamily: "MontserratBold",
  },
  weatherContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  weatherText: {
    textAlign: "right",
    fontFamily: "MontserratBold",
    color: COLORS.lightWhite,
    marginLeft: 5,
  },
});

export default ActivityHeader;
