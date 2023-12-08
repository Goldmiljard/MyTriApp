import axios from "axios";
import Constants from "expo-constants";
import { useEffect, useState } from "react";

const API_URL = Constants?.expoConfig?.hostUri
  ? "https://absolute-primary-sponge.ngrok-free.app/api"
  : "https://mytricareer-api.azurewebsites.net/api";

const useAxiosGet = (endpoint) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const options = {
    method: "GET",
    url: `${API_URL}${endpoint}`,
  };

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const response = await axios.request(options);
      setData(response.data);
    } catch (error) {
      setError(error);
      alert("Error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, isLoading, error };
};

export default useAxiosGet;
