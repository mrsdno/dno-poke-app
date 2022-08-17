import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./AllTeams.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";

const AllTeams = ({ teams }) => {
  if (!teams.length) {
    return <p className="no-teams">Where did all the teams go?</p>;
  }

  console.log(window.location.pathname);

  console.log(teams);

  function addPokemon(team) {
    if (window.location.pathname == "/userprofile") {
      if (team.pokemon.length < 6) {
        return (
          <Link to={"/pokemonlist"} state={{ teamIdArray: team._id }}>
            <button className="choose-pokemon-btn">Choose Your Pokémon</button>
          </Link>
        );
      } else {
        return (<div>This team is full.</div> )
      }
    }
}

    return (
      <>
        <div class="slides-wrapper">
          {teams.length > 0 ? (
            <Swiper
              slidesPerView={1}
              spaceBetween={0}
              centeredSlides={true}
              className="mySwiper"
            >
              {teams.map((team) => (
                  <SwiperSlide>
                      <div className="pokemon-wrapper">
                          <h2>{team.teamName}</h2>
                          <h3>by {team.username}</h3>
                          <div className="imgs-wrapper">
                  {team.pokemon &&
                    team.pokemon.map((pokemon) => (
                      <div className="each-pokemon">
                        <img
                          className="card-img-top team-image"
                          src={pokemon.image}
                          alt="Card1"
                        ></img>
                      </div>
                    ))}
                    </div>
                    {addPokemon(team)}
                          </div>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <h1>No Teams Yet</h1>
          )}
        </div>
      </>
    );
};

export default AllTeams;
/*
          {
            teams.map((team) => (
              <SwiperSlide>
                <h2 className="team-name">{team.teamName}</h2>
                {team.pokemon &&
                  team.pokemon.map((pokemon) => (
                    <div className="each-pokemon">
                      <h2 className="pokemon-name">{pokemon.name}</h2>
                      <img
                        className="card-img-top team-image"
                        src={pokemon.image}
                        alt="Card1"
                      ></img>
                    </div>
                  ))}
              </SwiperSlide>
            ));
          }
          */