import React from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import Error from "./components/Error.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Home from "./pages/Home.jsx";
import Teams from "./pages/Teams.jsx"
import TodaysMatches from "./pages/TodaysMatches.jsx";
import MainLayout from "./layout/MainLayout.jsx";
import TeamDetail from "./pages/TeamDetail.jsx"
import LeagueDetail from "./pages/LeagueDetail.jsx";
import Favorites from "./pages/Favorites.jsx";

const Routes = createBrowserRouter([
  {
    path: "",
    element: <MainLayout />,
    errorElement: <Error/>,
    children: [
      { path: "/", element: <Home /> },
      { path: "league/:leagueId", element: <LeagueDetail/>},
      { path: "team/:teamdetail", element: <TeamDetail/>},
      { path: "/teams", element: <Teams /> },
      { path: "/TodaysMatches", element: <TodaysMatches /> },
      { path: "/favorites", element: <Favorites /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={Routes} />;
}

export default App;
