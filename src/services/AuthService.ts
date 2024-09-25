import axios from "axios";
import { Preferences } from '@capacitor/preferences';

const apiUrl = process.env.API_URL;
// console.log("apiUrl -> ", apiUrl);

export const postLogin = async ({ email, password }: { email: string, password: string }) => {
  
  const res = await axios.post(`${apiUrl}/auth/login`, { email, password });
  // console.log(" <- datas -> ", res);

  const setData = async () => {
    await Preferences.set({
      key: 'token',
      value: res.data.access_token,
    });
  };

  if (res.data.access_token) {
    setData()
  }

  if (!res.data) {
    throw new Error('Error en el inicio de sesión');
  }

  return res;
};

export const getToken = () => {
  return localStorage.getItem("token");
};
