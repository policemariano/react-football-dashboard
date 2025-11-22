import React, { useEffect } from "react";
import { useParams } from "react-router";
import Loading from "../components/Loading";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

import {
  getStandings,
  getLeagueInfo,
  getRecentMatches,
} from "../redux/GetLeagueDetail";

export default function LeagueDetail() {
  const { leagueId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { standings, leagueInfo, loading } = useSelector(
    (state) => state.LeagueDetail
  );

  useEffect(() => {
    const currentSeason = "2025-2026";
    dispatch(getStandings({ leagueId, season: currentSeason }));
    dispatch(getLeagueInfo(leagueId));
    dispatch(getRecentMatches(leagueId));
  }, [leagueId, dispatch]);

  const handleTeamClick = (teamName) => {
    navigate(`/team/${teamName}`);
  };

  if (loading)
    return (
      <div className="d-flex align-items-center justify-content-center">
        <Loading />
      </div>
    );

  return (
    <div className="container">
      {leagueInfo && (
        <>
          <div className="text-center mb-4">
            <img
              src={leagueInfo.strBadge}
              alt={leagueInfo.strLeague}
              width="100"
            />
            <h1>{leagueInfo.strLeague}</h1>
            <p>{leagueInfo.strCountry}</p>
          </div>

          <h2>Standings</h2>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>#</th>
                <th>Team</th>
                <th>P</th>
                <th>W</th>
                <th>D</th>
                <th>L</th>
                <th>GD</th>
                <th>Pts</th>
              </tr>
            </thead>
            <tbody>
              {standings.map((team, index) => (
                <tr key={team.idStanding}>
                  <td>{index + 1}</td>
                  <td onClick={() => handleTeamClick(team.strTeam)}>
                    <img
                      src={team.strBadge}
                      alt={team.strTeam}
                      width="25"
                      style={{ marginRight: "10px", cursor: "pointer" }}
                    />
                    {team.strTeam}
                  </td>
                  <td>{team.intPlayed}</td>
                  <td>{team.intWin}</td>
                  <td>{team.intDraw}</td>
                  <td>{team.intLoss}</td>
                  <td>{team.intGoalDifference}</td>
                  <td>
                    <strong>{team.intPoints}</strong>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}
