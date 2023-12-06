import axios from "axios";
import Constants from "expo-constants";

const API_URL = Constants?.expoConfig?.hostUri
  ? "https://absolute-primary-sponge.ngrok-free.app/api"
  : "https://mytricareer-api.azurewebsites.net/api";
  
const useFetch = async (endpoint, method) => {

  const options = {
    method: method,
    url: `${API_URL}${endpoint}`,
    headers: {
      'Content-Type': 'application/json',               
      Accept : 'application/json',      
    }
  };

  console.log(options);
  return await axios.request(options);
};

export default useFetch;
