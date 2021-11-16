import axios from "axios";

const login = async (credentials) => {
  const headers = {
    "Content-Type": "application/json",
  };
  const { data } = await axios.post(
    "http://localhost:8082/login",
    credentials,
    { headers }
  );

  return data;

}

export default { login }
