import React from 'react'
import { Link } from 'react-router-dom';

// importing pages
import Login from './Login';
import Signup from './Signup';
import AllTeams from '../components/AllTeams/AllTeams';
import Auth from '../utils/auth';
import { useQuery } from '@apollo/client';
import { QUERY_TEAMS } from "../utils/queries";

function Home() {

    const { loading, data} = useQuery(QUERY_TEAMS);
    const teams = data?.teams || [];

    const loggedIn = Auth.loggedIn();
  return (
    <div className='home'>


            {loggedIn ? (
                // <Login />
                <Link to="/pokemonteam">
                    <button className='btn-3'>My Teams</button>
                </Link>
            ) : (
                <><Login />
                <p>or..</p>
                <Signup /></>
            )}

            {loading ? (
                <div>Loading...</div>
            ) : (
                <AllTeams
                    teams={teams}
                    title="Gotta catch 'em all!"
                    />
            )}


    </div>
  )
}

export default Home;