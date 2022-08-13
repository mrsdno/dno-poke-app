import React from 'react'
import '../components.css'
import '../../App.css'
import pokemonLogo from '../../assets/International_Pokémon_logo.svg.png'
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth'
import './Header.css'
import pokeball from '../../assets/pokeball.png';


// Header JSX
const Header = () => {
    // logout function
    const logout = event => {
        event.preventDefault();
        Auth.logout();
    };

    return (
      <header className="header">
        <div className="container">
        <Link to="/">
          <div className="logo">
            <h1>POKE-APP</h1>
          </div>
        </Link>
        <div className="pokeball">
          <img src={pokeball}></img>
          </div>
          </div>
        <nav className="justify-content-end">
          {Auth.loggedIn() ? (
            <div className="buttons">
              <Link to="/pokemonteam">
                <button className="btn-1">My Profile</button>
              </Link>
              <a href="/" onClick={logout}>
                <button className="btn-2">Logout</button>
              </a>
            </div>
          ) : (
            <div className="buttons">
              <Link to="/login">
                <button className="log-in">LOG IN</button>
              </Link>

              <Link to="/signup">
                <button className="sign-up">SIGN UP</button>
              </Link>
            </div>
          )}
        </nav>
      </header>
    );
};

// Export for External
export default Header