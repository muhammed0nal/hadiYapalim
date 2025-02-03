import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { jwtDecode } from "jwt-decode"; // jwt-decode kütüphanesini içeri aktarın

const TOKEN_KEY = process.env.REACT_APP_TOKEN_KEY || "jwt_token";
const AuthContext = createContext();
console.log("TOKEN_KEY-frontend", TOKEN_KEY);
export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    token: null,
    authenticated: null,
    userId: null,
    username: null,
  });

  console.log("authState-frontend", authState);

  useEffect(() => {
    const loadToken = async () => {
      try {
        const token = await SecureStore.getItemAsync(TOKEN_KEY);

        if (token) {
          const decodedToken = jwtDecode(token);

          const userId = decodedToken.userId;
          const username = decodedToken.username;

          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          setAuthState({
            token: token,
            authenticated: true,
            userId,
            username,
          });
        }
      } catch (error) {
        console.error("Token yükleme hatası:", error);
        await logout();
      }
    };
    loadToken();
  }, []);

  const login = async (result) => {
    try {
      setAuthState({
        token: result.data.token,
        authenticated: true,
        userId: result.data.userId,
        username: result.data.username,
      });

      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${result.data.token}`;
      console.log("result.data.token-frontend", result.data.token);
      await SecureStore.setItemAsync(TOKEN_KEY, result.data.token);

      return result;
    } catch (e) {
      return { error: true, message: e };
    }
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync(TOKEN_KEY);

    axios.defaults.headers.common["Authorization"] = "";

    setAuthState({
      token: null,
      authenticated: false,
      userId: null,
      username: null,
    });
  };

  const value = {
    onLogin: login,
    onLogout: logout,
    authState,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
