import axios from "axios";
import Constants from "expo-constants";

const API_URL = Constants?.expoConfig?.hostUri
  ? "https://absolute-primary-sponge.ngrok-free.app/api"
  : "https://mytricareer-api.azurewebsites.net/api";

const useAxiosPost = async (endpoint, body = {}) => {
  const url = `${API_URL}${endpoint}`
  return await axios.post(url, body);
};

export default useAxiosPost;
