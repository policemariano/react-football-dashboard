import { createSlice } from "@reduxjs/toolkit";

const loadFavoritesFromStorage = () => {
  try {
    const favorites = localStorage.getItem("favoriteTeams");
    return favorites ? JSON.parse(favorites) : [];
  } catch (error) {
    console.error("favorite loading error");
    return [];
  }
};

const initialState = {
  favoriteTeams: loadFavoritesFromStorage(),
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addToFavorites: (state, action) => {
      const team = action.payload;
      const exist = state.favoriteTeams.find((t) => t.idTeam === team.idTeam);

      if (!exist) {
        state.favoriteTeams.push(team);
        localStorage.setItem(
          "favoriteTeams",
          JSON.stringify(state.favoriteTeams)
        );
      }
    },
    removeFromFavorites: (state, action) => {
      const teamId = action.payload;
      state.favoriteTeams = state.favoriteTeams.filter(
        (t) => t.idTeam !== teamId
      );
      localStorage.setItem(
        "favoriteTeams",
        JSON.stringify(state.favoriteTeams)
      );
    },
    clearAllFavorites: (state) => {
      state.favoriteTeams = [];
      localStorage.removeItem("favoriteTeams");
    },
  },
});

export const {addToFavorites, removeFromFavorites, clearAllFavorites} = favoritesSlice.actions;
export default favoritesSlice.reducer;
