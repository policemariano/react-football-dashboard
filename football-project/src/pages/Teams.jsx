import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTeams } from "../redux/GetTeams";
import Loading from "../components/Loading";
import { addToFavorites, removeFromFavorites } from "../redux/FavoritesSlice";
import Error from "../components/Error";
import { useNavigate } from "react-router";

export default function Teams() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { teams, loading, error } = useSelector((state) => state.Teams);
  const favoriteTeams = useSelector((state) => state.Favorites.favoriteTeams);

  useEffect(() => {
    dispatch(getAllTeams());
  }, [dispatch]);

  const handleTeamClick = (teamName) => {
    navigate(`/team/${teamName}`);
    console.log(teamName);
  };

  const isFavorite = (teamId) => {
    return favoriteTeams.some((team => team.idTeam === teamId));
  };
  const toggleFavorite = (e, team) => {
    e.stopPropagation();
    if (isFavorite(team.idTeam)) {
      dispatch(removeFromFavorites(team.idTeam));
    } else {
      dispatch(addToFavorites(team));
    }
  };

  if (loading)
    return (
      <div className="d-flex align-items-center justify-content-center">
        <Loading />
      </div>
    );
  if (error)
    return (
      <div className="d-flex align-items-center justify-content-center">
        <Error error={error} />
      </div>
    );
  return (
    <div className="container">
      <h1 className="d-flex justify-content-center mb-5 fs-2">Popular Teams</h1>
      <div className="row">
        {teams && teams.length > 0 ? (
          teams.map((team) => (
            <div key={team.idTeam} className="col-md-3 mb-3">
              <div
                className="card"
                style={{
                  height: "320px",
                  objectFit: "contain",
                  padding: "20px",
                  cursor: "pointer",
                }}
              >
                <button
                  onClick={(e) => toggleFavorite(e, team)}
                  className="btn position-absolute top-0 end-0 m-2"
                  style={{
                    background: "none",
                    border: "none",
                    fontSize: "24px",
                    cursor: "pointer",
                    zIndex: 10,
                  }}
                >
                  {isFavorite(team.idTeam) ? "❤️" : "🤍"}
                </button>
                {team.strBadge && (
                  <img
                    src={team.strBadge}
                    className="card-img-top"
                    alt={team.strLeague}
                    style={{
                      height: "200px",
                      objectFit: "contain",
                      padding: "20px",
                    }}
                    onClick={() => handleTeamClick(team.strTeam)}
                  />
                )}
                <div className="card-body">
                  <h5 className="card-title">{team.strTeam}</h5>
                  <p className="card-text">{team.strCountry}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12">
            <Error />
          </div>
        )}
      </div>
    </div>
  );
}
