import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { Axios } from "axios";

const CACHE_DURATION = 15 * 60 * 1000;

const initialState = {
  teams: [],
  loading: false,
  error: null,
  lastFetch: null,
  cacheExpiry: CACHE_DURATION
};

export const getAllTeams = createAsyncThunk("teams", async (_, { getState }) => {

  const state = getState().Teams;
  const now = Date.now();
  const API_KEY = "3";

  if (state.lastFetch && (now - state.lastFetch < state.cacheExpiry)) {
    console.log("✅ TEAMS - Cache is being used");
    return state.teams;
  }

  const teamNames = [
    "Manchester United",
    "Real Madrid",
    "Liverpool",
    "Barcelona",
    "Bayern Munich",
    "Arsenal",
    "Borussia Dortmund",
    "Juventus",
    "Benfica",
    "Besiktas",
    "Tottenham Hotspur",
    "FC Porto",
  ];

  const teams = [];

  for (const teamName of teamNames) {
    try {
      const response = await axios.get(
        `https://www.thesportsdb.com/api/v1/json/${API_KEY}/searchteams.php?t=${encodeURIComponent(
          teamName
        )}`
      );

      if (response.data.teams?.[0]) {
        teams.push(response.data.teams[0]);
      }

      await new Promise((resolve) => setTimeout(resolve, 300));
    } catch (error) {
      console.error(`Error fetching ${teamName}:`, error.message);
    }
  }

  return teams;
});

export const getTeams = createSlice({
  name: "teams",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllTeams.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllTeams.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getAllTeams.fulfilled, (state, action) => {
        state.teams = action.payload;
        state.loading = false;
        state.lastFetch = Date.now();
      });
  },
});

export const {} = getTeams.actions;
export default getTeams.reducer;
