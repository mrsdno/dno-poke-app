import React, {useRef} from "react";
import "./AllTeams.css";
import { Swiper, SwiperSlide } from "swiper/react";

import { Pagination} from "swiper";
import "swiper/css/bundle";

const AllTeams = ({ teams }) => {
  if (!teams.length) {
    return <p className="no-teams">Where did all the teams go?</p>;
  }

  console.log(teams);

    return (
      <>
        <div class="slides-wrapper">
          {teams.length > 0 ? (
            <Swiper
              slidesPerView={1}
              spaceBetween={100}
              centeredSlides={true}
              pagination={{
                clickable: true,
              }}
              modules={[Pagination]}
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