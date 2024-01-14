import { configureStore } from "@reduxjs/toolkit";
import movieSlice from "../features/movie/movieSlice";

const store = configureStore({
  reducer: {
    movies: movieSlice,
  },
});

export default store;
