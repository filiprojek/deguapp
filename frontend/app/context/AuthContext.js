import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import storageUtil from "./storage";

const TOKEN_KEY = "my-jwt";
export const API_URL = "http://10.69.1.137:6060/api/v1";
const AuthContext = createContext(null);

export function useAuth() {
  const authContext = useContext(AuthContext);
  if (authContext === undefined) {
    throw new Error("Context is outside of provider");
  }
  return authContext;
}

export function AuthProvider({ children }) {
  const [authState, setAuthState] = useState({
    token: null,
    authenticated: null,
  });

  useEffect(() => {
    // tohle se zavola jen poprve pri startu appky
    async function loadToken() {
      const token = await storageUtil.getItem(TOKEN_KEY);
      console.log(`stored: ${token}`);

      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        setAuthState({
          token: token,
          authenticated: true,
        });

        return;
      }
      setAuthState({
        authenticated: false,
        token: null,
      });
    }
    loadToken();
  }, []);

  async function register(username, email, password) {
    try {
      const res = await axios.post(`${API_URL}/auth/signup`, {
        username,
        email,
        password,
      });
      return res
    } catch (err) {
      return { error: true, msg: err.response.data};
    }
  }

  async function login(email, password) {
    try {
      const res = await axios.post(`${API_URL}/auth/signin`, {
        email,
        password,
      });

      setAuthState({
        token: res.data.data.jwt,
        authenticated: true,
      });

      //axios.defaults.headers.common[
      //  "Authorization"
      //] = `Bearer ${res.data.data.jwt}`;

      await storageUtil.setItem(TOKEN_KEY, res.data.data.jwt);

      return res
    } catch (err) {
      return { error: true, msg: err.res };
    }
  }

  async function logout() {
    await storageUtil.delItem(TOKEN_KEY);

    axios.defaults.headers.common["Authorization"] = "";

    setAuthState({
      token: null,
      authenticated: false,
    });
  }

  const value = {
    onSignin: register,
    onLogin: login,
    onLogout: logout,
    authState,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
