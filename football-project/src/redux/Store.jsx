import { configureStore } from "@reduxjs/toolkit";
import LeagueSlice from "./League";
import LeagueDetailSlice from "./GetLeagueDetail";
import TeamDetailSlice from "./GetTeamDetail";
import TeamsSlice from "./GetTeams";
import TodaysMatchesSlice from "./TodaysMatchesSlice";
import FavoritesSlice from "./FavoritesSlice";
import ThemeSlice from "./ThemeSlice";

export const store = configureStore({
  reducer: {
    League: LeagueSlice,
    LeagueDetail: LeagueDetailSlice,
    TeamDetail: TeamDetailSlice,
    Teams: TeamsSlice,
    TodaysMatch: TodaysMatchesSlice,
    Favorites: FavoritesSlice,
    Theme: ThemeSlice,
  },
});
