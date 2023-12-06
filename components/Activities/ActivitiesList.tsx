import { ScrollView, StyleSheet, Text } from "react-native";
import Activity from "./Activity";
import { COLORS } from "../../constants";
import useFetch from "../../hook/useFetch";
import { useEffect, useState } from "react";

export default function ActivitiesList() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    getActivities();
  }, []);

  const getActivities = () => {
    useFetch("/Activities", "GET")
      .then((response) => {
        setActivities(response.data);
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
      <Text>Activities List</Text>
      {activities?.map((activity) => (
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
