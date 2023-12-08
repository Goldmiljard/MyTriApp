import { ActivityIndicator, ScrollView, StyleSheet, Text } from "react-native";
import Activity from "./Activity";
import { COLORS } from "../../constants";
import useAxiosGet from "../../hook/useAxiosGet";

const ActivitiesList = () => {
  const { data, isLoading, error } = useAxiosGet("/Activities");

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
      <Text>Activities List</Text>
      {isLoading ? (
          <ActivityIndicator size="large" color={COLORS.blue} />
        ) : error ? (
          <Text>Something went wrong</Text>
        ) : data?.map((activity) => (
        <Activity activity={activity} key={`activity-${activity.id}`} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    height: "100%",
    backgroundColor: COLORS.black,
  },
});

export default ActivitiesList;
