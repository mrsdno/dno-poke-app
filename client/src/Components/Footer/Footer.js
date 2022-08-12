import React from 'react'
// import './footer.css'
import "../components.css"
import Hooh from '../../assets/flying-ho-oh.gif'
import Lugia from "../../assets/flying-lugia.gif"
import PeekingPika from "../../assets/svg/PeekingPika"
import './Footer.css';
import '../../App.js'


function Footer () {
  return (
    <footer className="footer">

      <div className="peeking-pika"><PeekingPika></PeekingPika></div>
      <div className="copyright">© 2022 Christine</div>
    </footer>
  );
};

export default Footer