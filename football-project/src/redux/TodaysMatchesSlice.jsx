import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Loading from "../components/Loading";

const CACHE_DURATION = 5 * 60 * 1000;

const initialState = {
  todaysMatches: [],
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
];

export const getTodaysMatches = createAsyncThunk(
  "todays",
  async (_, { getState }) => {
    const state = getState().TodaysMatch;
    const now = Date.now();

    if (state.lastFetch && now - state.lastFetch < state.cacheExpiry) {
      console.log("✅ MATCHES - Cache is being used");
      return state.todaysMatches;
    }

    const requests = popularLeagueIds.map((leagueId) =>
      axios.get(
        `https://www.thesportsdb.com/api/v1/json/3/eventspastleague.php?id=${leagueId}`
      )
    );
    const responses = await Promise.all(requests);
    const allMatches = responses.flatMap(
      (response) => response.data.events || []
    );

    const uniqueMatches = allMatches.reduce((acc, match) => {
      if (!acc.find((m) => m.idEvent === match.idEvent)) {
        acc.push(match);
      }
      return acc;
    }, []);

    const sortedMatches = uniqueMatches
      .sort((a, b) => new Date(b.dateEvent) - new Date(a.dateEvent))
      .slice(0, 15);

    return sortedMatches;
  }
);

const todaysMathesSlice = createSlice({
  name: "todaysMatches",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTodaysMatches.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTodaysMatches.fulfilled, (state, action) => {
        state.todaysMatches = action.payload;
        state.loading = false;
        state.lastFetch = Date.now();
      })
      .addCase(getTodaysMatches.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default todaysMathesSlice.reducer;
export const {} = todaysMathesSlice.actions;
