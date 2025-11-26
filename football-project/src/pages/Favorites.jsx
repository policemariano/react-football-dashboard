import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromFavorites, clearAllFavorites } from "../redux/FavoritesSlice";
import { useNavigate } from "react-router";

export default function Favorites() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const favoriteTeams = useSelector((state) => state.Favorites.favoriteTeams);

  const handleRemoveFavorite = (teamId) => {
    dispatch(removeFromFavorites(teamId));
  };

  const handleClearAll = () => {
    if (window.confirm("Are you sure you want to clear all favorites?")) {
      dispatch(clearAllFavorites());
    }
  };

  const handleTeamClick = (teamName) => {
    navigate(`/team/${teamName}`);
  };

  if (favoriteTeams.length === 0) {
    return (
      <div className="container text-center vh-100">
        <h1 className="mb-4">My Favorite Teams</h1>
        <div className="alert alert-info d-flex flex-column m-5 align-items-center justify-content-center mb-0">
          <h4>You don't have a favorite team yet</h4>
          <p>You can add your favorite teams from the Popular Teams page.</p>
          <button 
            className="btn btn-primary mt-3"
            onClick={() => navigate('/teams')}
          >
            Go to Teams
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="fs-2 mt-5">My Favorite Teams ({favoriteTeams.length})</h1>
        <button 
          className="btn btn-danger"
          onClick={handleClearAll}
        >
          Clear All
        </button>
      </div>

      <div className="row">
        {favoriteTeams.map((team) => (
          <div key={team.idTeam} className="col-md-3 mb-3">
            <div
              className="card position-relative"
              style={{
                height: "320px",
                objectFit: "contain",
                padding: "20px",
              }}
            >
              {/* Kaldır Butonu */}
              <button
                onClick={() => handleRemoveFavorite(team.idTeam)}
                className="btn btn-danger position-absolute top-0 end-0 m-2"
                style={{
                  fontSize: "12px",
                  padding: "5px 10px",
                  zIndex: 10
                }}
              >
                ❌ Remove
              </button>

              {team.strBadge && (
                <img
                  src={team.strBadge}
                  className="card-img-top"
                  alt={team.strTeam}
                  style={{
                    height: "200px",
                    objectFit: "contain",
                    padding: "20px",
                    cursor: "pointer",
                  }}
                  onClick={() => handleTeamClick(team.strTeam)}
                />
              )}
              <div className="card-body">
                <h5 
                  className="card-title" 
                  style={{ cursor: "pointer" }}
                  onClick={() => handleTeamClick(team.strTeam)}
                >
                  {team.strTeam}
                </h5>
                <p className="card-text">{team.strCountry}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}