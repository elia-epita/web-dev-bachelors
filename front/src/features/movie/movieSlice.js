import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../constants/axios";
import { requests } from "../../constants/requests";

const initialState = {
  movies: {
    "Top Rated": [],
    Trending: [],
    Horror: [],
    Romance: [],
    Comedy: [],
    "Netflix Originals": [],
    Documentaries: [],
  },
  status: "idle",
  error: null,
};

export const getMovies = createAsyncThunk("movies/fetchMovies", async () => {
  try {
    const response = await instance.get(requests.fetchAllMovies, {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("user")).token
        }`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMovies.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getMovies.fulfilled, (state, action) => {
        state.movies = action.payload.movies;
        state.status = "success";
      })
      .addCase(getMovies.rejected, (state, action) => {
        state.status = "failed";
      })
  },
});

export default movieSlice.reducer;

export const selectAllMovies = (state) => state.movies.movies;
export const getMoviesStatus = (state) => state.movies.status;
export const getMoviesErrors = (state) => state.movies.error;
