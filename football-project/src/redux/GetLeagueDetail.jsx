import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { Axios } from "axios";
import Loading from "../components/Loading.jsx";

const CACHE_DURATION = 10 * 60 * 1000;

const initialState = {
  standings: [],
  leagueInfo: null,
  recentMatches: [],
  loading: false,
  error: null,
  lastFetch: {},
  cacheExpiry: CACHE_DURATION,
};

export const getStandings = createAsyncThunk(
  "leagueDetail/getStandings",
  async ({ leagueId, season }, { getState }) => {
    const state = getState().LeagueDetail;
    const now = Date.now();
    const cacheKey = `standings-${leagueId}`;
    if (
      state.lastFetch[cacheKey] &&
      now - state.lastFetch[cacheKey] < state.cacheExpiry
    ) {
      return state.standings;
    }

    const response = await axios.get(
      `https://www.thesportsdb.com/api/v1/json/3/lookuptable.php?l=${leagueId}&s=${season}`
    );
    return response.data.table || [];
  }
);

export const getLeagueInfo = createAsyncThunk(
  "leagueDetail/getLeagueInfo",
  async (leagueId) => {
    const response = await axios.get(
      `https://www.thesportsdb.com/api/v1/json/3/lookupleague.php?id=${leagueId}`
    );
    return response.data.leagues[0];
  }
);

export const getRecentMatches = createAsyncThunk(
  "leagueDetail/getRecentMatches",
  async (leagueId) => {
    const response = await axios.get(
      `https://www.thesportsdb.com/api/v1/json/3/eventspastleague.php?id=${leagueId}`
    );
    return response.data.events?.slice(0, 10) || [];
  }
);

const leagueDetailSlice = createSlice({
  name: "leagueDetail",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getStandings.pending, (state) => {
        state.loading = true;
      })
      .addCase(getStandings.fulfilled, (state, action) => {
        state.loading = false;
        state.standings = action.payload;
        state.lastFetch[`standings-${action.meta.arg.leagueId}`] = Date.now();
      })
      .addCase(getStandings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getLeagueInfo.fulfilled, (state, action) => {
        state.leagueInfo = action.payload;
      })
      .addCase(getRecentMatches.fulfilled, (state, action) => {
        state.recentMatches = action.payload;
      });
  },
});

export default leagueDetailSlice.reducer;
