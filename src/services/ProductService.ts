import axios from "axios";

const apiUrl = process.env.API_URL;

export const getAllProduct = async () => {
  const resp = await axios.get(`${apiUrl}/products`);
  return resp.data;
};
