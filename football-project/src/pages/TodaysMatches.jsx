import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTodaysMatches } from "../redux/TodaysMatchesSlice";
import Loading from "../components/Loading";
import Error from "../components/Error";

export default function TodaysMatches() {
  const dispatch = useDispatch();
  const { loading, error, todaysMatches } = useSelector(
    (state) => state.TodaysMatch
  );

  useEffect(() => {
    dispatch(getTodaysMatches());
  }, []);

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
      <h1 className="d-flex justify-content-center mb-5 fs-2">
        Today's Matches
      </h1>
      <div className="row">
        {todaysMatches && todaysMatches.length > 0 ? (
          todaysMatches.map((match, index) => (
            <div key={index} className="col-md-6 mb-3">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="text-center" style={{ width: "40%" }}>
                      {match.strHomeTeamBadge && (
                        <img
                          src={match.strHomeTeamBadge}
                          alt={match.strHomeTeam}
                          width="50"
                        />
                      )}
                      <p className="mt-4 mb-0">
                        <strong>{match.strHomeTeam}</strong>
                      </p>
                    </div>

                    <div className="text-center" style={{ width: "20%" }}>
                      {match.intHomeScore && match.intAwayScore ? (
                        <h3>
                          {match.intHomeScore} - {match.intAwayScore}
                        </h3>
                      ) : (
                        <p className="text-muted">{match.strTime || "TBD"}</p>
                      )}
                      <span className="badge bg-info fw-medium p-1">
                        {match.strStatus}
                      </span>
                    </div>

                    <div className="text-center" style={{ width: "40%" }}>
                      {match.strAwayTeamBadge && (
                        <img
                          src={match.strAwayTeamBadge}
                          alt={match.strAwayTeam}
                          width="50"
                        />
                      )}
                      <p className="mt-4 mb-0">
                        <strong>{match.strAwayTeam}</strong>
                      </p>
                    </div>
                  </div>
                  <p className="text-center text-muted mt-2 mb-0">
                    {match.strLeague}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12 text-center">
            <p>No matches found for today</p>
          </div>
        )}
      </div>
    </div>
  );
}
