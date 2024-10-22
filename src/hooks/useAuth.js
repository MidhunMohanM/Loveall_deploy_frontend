import React, { createContext, useState, useEffect, useContext } from "react";
import { getToken, removeToken, setToken } from "../utils/tokenManager";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!getToken());
  const api = process.env.REACT_APP_API_URL;

  useEffect(() => {
    console.log("Authentication: " + isAuthenticated);
  }, [isAuthenticated]);

  const login = async ({ email, password, otp, rememberMe }) => {
    const loginApi = api + "/auth/login";
    try {
      const response = await fetch(loginApi, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, otp })
      });
      const data = await response.json();
      console.log(data);
      if (data.success) {
        const auth_token = data.token;
        setToken({ rememberMe, auth_token });
        setIsAuthenticated(true);
      }
      return { message: data.message, redirectTo: data.redirectTo, success: data.success };
    } catch (error) {
      console.log(error);
      return { message: "Error in login", redirectTo: null, success: false };
    }
  };

  const logout = async () => {
    removeToken();
    setIsAuthenticated(false);
  };

  const register = async (payload) => {
    const registerApi = api + "/auth/register";
    try {
      const response = await fetch(registerApi, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          first_name: payload.first_name,
          last_name: payload.last_name,
          email: payload.email,
          phone_number: payload.phone_number,
          password: payload.password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Registration successful:', data);
        // navigate('/registration2');
      } else {
        const errorData = await response.json();
        alert(`Registration failed: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error during registration:', error);
      alert('An error occurred during registration. Please try again.');
    }
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
