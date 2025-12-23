import express from "express";


const router = express.Router();

const BASE_URL = "https://api.themoviedb.org/3";

const headers = {
  accept: "application/json",
  Authorization: `Bearer ${process.env.TMDB_BEARER}`,
};

// MOVIE DETAILS
router.get("/movie/:id", async (req, res) => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/${req.params.id}?language=en-US`,
      { headers }
    );
    console.log("TMDB STATUS:", response.status);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("TMDB FETCH ERROR 👇");
    console.error(error);
    res.status(500).json({ error: "Failed to fetch movie" });
  }
});

// RECOMMENDATIONS
router.get("/movie/:id/recommendations", async (req, res) => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/${req.params.id}/recommendations?language=en-US&page=1`,
      { headers }
    );
    const data = await response.json();
    res.json(data);
  } catch {
    res.status(500).json({ error: "Failed to fetch recommendations" });
  }
});

// VIDEOS
router.get("/movie/:id/videos", async (req, res) => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/${req.params.id}/videos?language=en-US`,
      { headers }
    );
    const data = await response.json();
    res.json(data);
  } catch {
    res.status(500).json({ error: "Failed to fetch videos" });
  }
});

// CATEGORY
router.get("/category/:category", async (req, res) => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/${req.params.category}?language=en-US&page=1`,
      { headers }
    );
    const data = await response.json();
    res.json(data);
  } catch {
    res.status(500).json({ error: "Failed to fetch category" });
  }
});

export default router;
