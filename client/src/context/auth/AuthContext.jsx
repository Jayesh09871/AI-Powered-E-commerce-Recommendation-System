import { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

// Using the deployed frontend URL
const API_URL = 'https://ai-powered-e-commerce-recommendatio.vercel.app/api/auth';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if user is authenticated on initial load
  useEffect(() => {
    loadUser();
  }, []);

  // Load user from token
  const loadUser = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        return;
      }

      // Set the token in the default headers for all axios requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      const res = await axios.get(`${API_URL}/me`);

      setUser(res.data);
      setIsAuthenticated(true);
    } catch (err) {
      localStorage.removeItem('token');
      setError(err.response?.data?.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  // Register user
  const register = async (formData) => {
    try {
      const res = await axios.post(`${API_URL}/register`, formData);
      const { token, user } = res.data;

      localStorage.setItem('token', token);
      setUser(user);
      setIsAuthenticated(true);
      setError(null);
      return { success: true };
    } catch (err) {
      setError(err.response?.data?.errors?.[0]?.msg || 'Registration failed');
      return { success: false };
    }
  };

  // Login user
  const login = async (formData) => {
    try {
      const res = await axios.post(`${API_URL}/login`, formData);
      const { token, user } = res.data;

      localStorage.setItem('token', token);
      // Set the token in the default headers for all axios requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser(user);
      setIsAuthenticated(true);
      setError(null);
      return { success: true };
    } catch (err) {
      console.error('Login error:', err);
      setError(err.response?.data?.message || 'Invalid credentials');
      return { success: false };
    }
  };

  // Logout user
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setIsAuthenticated(false);
    setError(null);
  };

  // Clear errors
  const clearErrors = () => setError(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        error,
        register,
        login,
        logout,
        clearErrors,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
