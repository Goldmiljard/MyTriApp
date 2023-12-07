import { COLORS } from "../../constants";
import MyText from "../Generic/MyText";
import { StyleSheet } from "react-native";

const PaceStat = (props) => {
  const activityPace = () => {
    const paceMinutes = Math.floor(1000 / props.averageSpeed / 60).toFixed(0);
    const paceSeconds = Math.round((1000 / props.averageSpeed) % 60)
      .toFixed(0)
      .padStart(2, "0");

    return `${paceMinutes}:${paceSeconds}/ K`;
  };

  return <MyText style={props.style}>{activityPace()}</MyText>;
};

const styles = StyleSheet.create({
    pace: {
    color: COLORS.white,
  },
});

export default PaceStat;
