import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { Axios } from "axios";
import Loading from "../components/Loading.jsx";

const CACHE_DURATION = 30 * 60 * 1000;

const initialState = {
  teamDetail: null,
  loading: false,
  error: null,
  cache: {},
  lastFetch: {} 
};

export const getTeam = createAsyncThunk(
  "teamDetail/getTeam",
  async ({ team }, { getState }) => {
    const state = getState().TeamDetail;
    const now = Date.now();

    if (state.cache[team] && 
        state.lastFetch[team] && 
        (now - state.lastFetch[team] < CACHE_DURATION)) {
      console.log(`${team}`);
      return state.cache[team];
    }

    const response = await axios.get(
      `https://www.thesportsdb.com/api/v1/json/123/searchteams.php?t=${team}`
    );
    return response.data.teams?.[0] || null;
  }
);


const teamDetailSlice = createSlice({
  name: "teamDetail",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTeam.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTeam.fulfilled, (state, action) => {
        state.loading = false;
        state.teamDetail = action.payload;
         if (action.payload && action.payload.strTeam) {
          const teamName = action.payload.strTeam;
          state.cache[teamName] = action.payload;
          state.lastFetch[teamName] = Date.now();
        }
      })
      .addCase(getTeam.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
  },
});

export default teamDetailSlice.reducer;
