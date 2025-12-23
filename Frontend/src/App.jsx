import React, { useEffect } from "react";
import Navbar from "./components/Navbar";
import MoviePage from "./pages/MoviePage";
import HomePage from "./pages/HomePage";
import { Routes, Route } from "react-router";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/authStore";
import AIRecomm from "./pages/AIRecommendations";
const App = () => {
  const { fetchUser, fetchingUser } = useAuthStore();
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  if (fetchingUser) {
    return <p>Loading...</p>;
  }
  return (
    <div>
      <Toaster />
      <Navbar />
      {/* <HomePage /> */}
      <Routes>
        <Route path={"/"} element={<HomePage />} />
        <Route path={"/movie/:id"} element={<MoviePage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/ai-recommendations" element={<AIRecomm />} />
      </Routes>
    </div>
  );
};

export default App;
