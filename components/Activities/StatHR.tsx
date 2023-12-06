import MyText from "../Generic/MyText";

const StatHR = (props) => {
  const activityHR = () => {
    return props.averageHeartrate !== 0
      ? props.averageHeartrate.toFixed(0)
      : "N/A";
  };

  return <MyText style={props.style}>{activityHR()}</MyText>;
};

export default StatHR;
