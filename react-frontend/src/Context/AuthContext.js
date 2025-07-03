import { createContext, useContext, useEffect, useState } from "react";
import apiService from "../Services/apiService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  // При всяка смяна на токена - ъпдейтваме localStorage
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  // Проверка при зареждане
  useEffect(() => {
    if (token) {
      apiService.auth()
        .then(res => setUser(res.data))
        .catch(() => {
          setUser(null);
          setToken(null); // невалиден токен
        })
        .finally(() => setAuthChecked(true));
    } else {
      setAuthChecked(true);
    }
  }, [token]);

  const login = async (credentials) => {
    const response = await apiService.login(credentials);
    setToken(response.data.token);
    setUser(response.data.user);
  };

  const logout = async () => {
    await apiService.logout().catch(() => {}); // без значение дали успее
    setUser(null);
    setToken(null);
  };

  // Dummy refresh token пример
  const refreshToken = async () => {
    const response = await apiService.refresh();
    setToken(response.data.token);
  };

  return (
    <AuthContext.Provider value={{ user, token, authChecked, login, logout, refreshToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
