import React, { useEffect } from "react";
import { useParams } from "react-router";
import Loading from "../components/Loading";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { getTeam } from "../redux/GetTeamDetail";
import { addToFavorites, removeFromFavorites } from "../redux/FavoritesSlice";

export default function TeamDetail() {
  const { teamdetail } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { teamDetail, loading, error } = useSelector(
    (state) => state.TeamDetail
  );
  const favoriteTeams = useSelector((state) => state.Favorites.favoriteTeams);

  useEffect(() => {
    if (teamdetail) {
      dispatch(getTeam({ team: teamdetail }));
    }
  }, [teamdetail, dispatch]);

  const handleLeagueClick = (leagueId) => {
    navigate(`/league/${leagueId}`)
  }
  const isFavorite = () => {
    return teamDetail && favoriteTeams.some(team => team.idTeam === teamDetail.idTeam);
  };
  const toggleFavorite = () => {
    if (teamDetail) {
      if (isFavorite()) {
        dispatch(removeFromFavorites(teamDetail.idTeam));
      } else {
        dispatch(addToFavorites(teamDetail));
      }
    }
  };

  if (loading)
    return (
      <div className="d-flex align-items-center justify-content-center">
        <Loading />
      </div>
    );

  return (
    <div className="container">
      <>
        <div className="container">
          {teamDetail && (
            <div className="text-center">
              <img
                src={teamDetail.strBadge}
                alt={teamDetail.strTeam}
                width="150"
                className="mb-3"
              />
              <h1>{teamDetail.strTeam}</h1>
              <button
                onClick={toggleFavorite}
                className={`btn ${isFavorite() ? 'btn-danger' : 'btn-outline-danger'} mb-3`}
              >
                {isFavorite() ? '❤️ Remove from Favorites' : '🤍 Add to Favorites'}
              </button>
              <p>
                <strong>Stadium:</strong> {teamDetail.strStadium}
              </p>
              <p>
                <strong>Country:</strong> {teamDetail.strCountry}
              </p>
              <p onClick={() => handleLeagueClick(teamDetail.idLeague)}>
                <strong className="badge text-bg-info" style={{cursor:"pointer"}}>League:</strong> {teamDetail.strLeague}
              </p>
              <p>{teamDetail.strDescriptionEN}</p>
            </div>
          )}
          {error && <div className="alert alert-danger">Error: {error}</div>}
        </div>
      </>
    </div>
  );
}
