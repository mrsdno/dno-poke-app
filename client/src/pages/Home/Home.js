import React from "react";
import { Link } from "react-router-dom";

// importing pages
import AllTeams from "../../Components/AllTeams/AllTeams";
import Auth from "../../utils/auth";
import { useQuery } from "@apollo/client";
import { QUERY_TEAMS } from "../../utils/queries";
import PokemonLogo from "../../assets/svg/PokemonLogo"
import "./Home.css";

function Home() {
  const { loading, data } = useQuery(QUERY_TEAMS);
  const teams = data?.teams || [];

  const loggedIn = Auth.loggedIn();
  return (
    <div className="wrapper">
      <div className="jumbotron">
        <h2>
          BUILD YOUR BEST <div className="bottom-line"> <PokemonLogo />
          TEAM.</div>
        </h2>
      </div>
      <div className="home">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <AllTeams teams={teams} title="Gotta catch 'em all!" />
        )}
      </div>
    </div>
  );
}

export default Home;
