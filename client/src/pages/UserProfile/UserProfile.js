
import React, {useEffect, useState} from 'react';
import { useQuery, useMutation } from "@apollo/client";
import { ADD_TEAM } from '../../utils/mutations';
import { QUERY_ME, QUERY_TEAMS } from "../../utils/queries";
import TeamList from '../../components/TeamList/TeamList'
import './UserProfile.css';
import { Link } from 'react-router-dom';


function UserProfile() {
  const [teamName, setText] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { loading, data: userData } = useQuery(QUERY_ME);
  const { loadingTeams, data: teams } = useQuery(QUERY_TEAMS, { variables: { username: userData?.me.username } });

  const [addTeam, { error }] = useMutation(ADD_TEAM, {
    update(cache, { data: { addTeam } }) {
      // could not exist yet, so wrap in a try/catch
      try {
        const { me } = cache.readQuery({ query: QUERY_ME });

        // update team array's cache
        cache.writeQuery({
          query: QUERY_ME,
          data: { me: { ...me, teams: [...me.teams, addTeam] } },
        });
      } catch (e) {
        console.warn("First interation by user");
      }

      // update teams array's cache
      const { teams } = cache.readQuery({
        query: QUERY_TEAMS,
        variables: { username: userData?.me.username },
      });
      cache.writeQuery({
        query: QUERY_TEAMS,
        variables: { username: userData?.me.username },
        data: { teams: [addTeam, ...teams] },
      });
    }
  })

  const handleChange = (event) => {
    if (event.target.value.length <= 280) {
      setText(event.target.value);
    }
  };

  const handleAddTeam = async (event) => {
    event.preventDefault();
    // console.log(teams);

    if (!teamName) {
      setErrorMessage('Please enter a team name!')
    }
    try {
      const { data } = await addTeam({
        variables: { teamName, userData, isFavorite: false },
      });
    } catch (e) {
      console.error(e);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-wrapper">
      <div className="form-wrapper">
        <h2>{userData?.me.username}'s Teams</h2>
        <form id="add-team" class="search-team-form" onSubmit={handleAddTeam}>
          <input
            id="team-name"
            value={teamName}
            placeholder="Name your team!"
            onChange={handleChange}
            className="input-bar"
          ></input>
          <button className="eye-search" type="submit" id="add-team">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="45.985"
              height="32"
              viewBox="0 0 45.985 32"
            >
              <g id="view" transform="translate(-1.007 -8)">
                <path
                  id="Path_8"
                  data-name="Path 8"
                  d="M46.424,22.162C43.458,17.9,35.336,8,24,8,12.565,8,4.5,17.911,1.566,22.176a3.235,3.235,0,0,0,.009,3.648h0C4.537,30.087,12.65,40,24,40c11.246,0,19.42-9.9,22.414-14.164a3.228,3.228,0,0,0,.01-3.674Z"
                  fill="#e3e3e3"
                />
                <circle
                  id="Ellipse_1"
                  data-name="Ellipse 1"
                  cx="11"
                  cy="11"
                  r="11"
                  transform="translate(13 13)"
                  fill="#3aace9"
                />
                <circle
                  id="Ellipse_2"
                  data-name="Ellipse 2"
                  cx="6"
                  cy="6"
                  r="6"
                  transform="translate(18 18)"
                  fill="#363636"
                />
                <circle
                  id="Ellipse_3"
                  data-name="Ellipse 3"
                  cx="2.5"
                  cy="2.5"
                  r="2.5"
                  transform="translate(17 18)"
                  fill="#fff"
                />
              </g>
            </svg>
          </button>
        </form>
      </div>
      {/* error message if teamName is empty */}
      {errorMessage && (
        <div>
          <p>{errorMessage}</p>
        </div>
      )}

      <div className="user-teams-wrapper">
        {teams && <TeamList teams={teams.teams} />}
      </div>

      <Link to="/">
        <button className="btn-3">All other Teams</button>
      </Link>
    </div>
  );
}

export default UserProfile;