import { create } from "zustand";
import axios from "axios";

axios.defaults.withCredentials = true;

// const API_URL = "http://localhost:8080/api";
// const API_URL = "https://visionflix.onrender.com";
const AUTH_API = "https://visionflix.onrender.com/api";
const TMDB_API = "https://visionflix.onrender.com/api/tmdb";

export const useAuthStore = create((set) => ({
  // intial states
  user: null,
  isLoading: false,
  error: null,
  message: null,
  fetchingUser: true,

  //functions
  signup: async (username, email, password) => {
    set({ isLoading: true, message: null, error: null });

    try {
      const response = await axios.post(`${AUTH_API}/signup`, {
        username,
        email,
        password,
      });
      set({ user: response.data.user, isLoading: false });
    } catch (error) {
      set({
        isLoading: false,
        error: error.response.data.message || "Error signing up",
      });
      throw error;
    }
  },

  login: async (username, password) => {
    set({ isLoading: true, message: null, error: null });

    try {
      const response = await axios.post(`${AUTH_API}/login`, {
        username,
        password,
      });

      const { user, message } = response.data;

      set({
        user,
        message,
        isLoading: false,
      });

      return { user, message };
    } catch (error) {
      set({
        isLoading: false,
        error: error.response.data.message || "Error logging in",
      });
      throw error;
    }
  },
  fetchUser: async () => {
    set({ fetchingUser: true, error: null });
    try {
      const response = await axios.get(`${AUTH_API}/fetch-user`);
      set({ user: response.data.user, fetchingUser: false });
    } catch (error) {
      set({
        fetchingUser: false,
        error: null,
        user: null,
      });
      throw error;
    }
  },
  logout: async () => {
    set({ isLoading: true, error: null, message: null });
    try {
      const response = await axios.post(`${AUTH_API}/logout`);
      const { message } = response.data;
      set({
        message,
        isLoading: false,
        user: null,
        error: null,
      });
      return {message}
    } catch (error) {
      set({
        isLoading: false,
        error: error.response.data.message || "Error logging out",
      });
      throw error;
    }
  },
}));
