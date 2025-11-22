import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { gelAllLeague } from "../redux/League";
import Loading from "../components/Loading";
import Error from "../components/Error";
import { useNavigate } from "react-router";

export default function Home() {
  const dispatch = useDispatch();
  const { leagues, loading, error } = useSelector((state) => state.League);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(gelAllLeague());
  }, [dispatch]);

  const handleLeagueClick = (leagueId) => {
    navigate(`/league/${leagueId}`)
  }

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
      <h1 className="d-flex justify-content-center mb-5 fs-2">Popular Leagues</h1>
      <div className="row">
        {leagues && leagues.length > 0 ? (
          leagues.map(league => (
            <div key={league.idLeague} className="col-md-3 mb-3">
              <div className="card" style={{ height: '320px', objectFit: 'contain', padding: '20px', cursor:"pointer" }} onClick={() => handleLeagueClick(league.idLeague)}>
                {league.strBadge && (
                  <img 
                    src={league.strBadge} 
                    className="card-img-top" 
                    alt={league.strLeague}
                    style={{ height: '200px', objectFit: 'contain', padding: '20px' }}
                  />
                )}
                <div className="card-body">
                  <h5 className="card-title">{league.strLeague}</h5>
                  <p className="card-text">{league.strCountry}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12 d-flex justify-content-center">
            <p>No leagues found</p>
          </div>
        )}
      </div>
    </div>
  );
}
