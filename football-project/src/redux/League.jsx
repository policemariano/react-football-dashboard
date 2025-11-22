import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { Axios } from "axios";

const CACHE_DURATION = 10 * 60 * 1000;

const initialState = {
  leagues: [],
  loading: false,
  error: null,
  lastFetch: null,
  cacheExpiry: CACHE_DURATION,
};

const popularLeagueIds = [
  4328, // English Premier League
  4335, // Spanish La Liga
  4332, // Italian Serie A
  4331, // German Bundesliga
  4339, // Turkish Super Lig
  4334, // French Ligue 1
  4346, // UEFA Champions League
  4480, // UEFA Europa League
  4351, // Brazilian Serie A
  4356, // Argentine Primera Division
  4344, // Eredevisie
  4338, // Belgian Pro League
];

export const gelAllLeague = createAsyncThunk(
  "league",
  async (_, { getState }) => {
    const state = getState().League;
    const now = Date.now();

    if (state.lastFetch && now - state.lastFetch < state.cacheExpiry) {
      console.log("✅ LEAGUE - Cache is being used");
      return state.leagues;
    }

    const response = popularLeagueIds.map((id) =>
      axios.get(
        `https://www.thesportsdb.com/api/v1/json/3/lookupleague.php?id=${id}`
      )
    );
    const responses = await Promise.all(response);
    const leagues = responses
      .map((response) => response.data.leagues[0])
      .filter(Boolean);
    return leagues;
  }
);

export const getLeague = createSlice({
  name: "League",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(gelAllLeague.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(gelAllLeague.fulfilled, (state, action) => {
        state.loading = false;
        state.leagues = action.payload;
        state.lastFetch = Date.now();
      })
      .addCase(gelAllLeague.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
export const {} = getLeague.actions;
export default getLeague.reducer;
