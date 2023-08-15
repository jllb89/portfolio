import React, { useState, useContext } from 'react';
import { ScrollContext } from './App';

function Navbar({ homeRef, aboutRef, worksRef, contactRef }) {
  const { scrollRef } = useContext(ScrollContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHovering, setIsHovering] = useState(false); // New state for tracking hover

  const handleScrollTo = (sectionRef) => {
    if (scrollRef && scrollRef.current && sectionRef && sectionRef.current) {
      scrollRef.current.scrollTo(sectionRef.current, { duration: 800, easing: [0.19, 1, 0.22, 1] });
      setIsMenuOpen(false);
    }
  };

  return (
    <nav className={`navbar ${isMenuOpen ? 'menu-open' : ''}`} data-scroll data-scroll-sticky>
      {isMenuOpen && <div className="overlay visible" onClick={() => setIsMenuOpen(false)}></div>}
      <div className="navbar-content">
        <div className="column logo">
          <div>jorge luis lópez</div>
          <div className="job-title">senior product manager & designer</div>
        </div>
        <div className={`center-columns ${isMenuOpen ? '' : 'hidden'}`}>
          <div className="column links main-links">
            <a onClick={() => handleScrollTo(homeRef)}>home</a>
            <a onClick={() => handleScrollTo(aboutRef)}>about</a>
            <a onClick={() => handleScrollTo(worksRef)}>works</a>
            <a onClick={() => handleScrollTo(contactRef)}>contact</a>
          </div>
          <div className="column links external-links">
            <a href={`${process.env.PUBLIC_URL}/jllb2023.pdf`} download>cv</a>
            <a href="https://github.com/your-github-username" target="_blank" rel="noopener noreferrer">github</a>
            <a href="https://medium.com/@your-medium-username" target="_blank" rel="noopener noreferrer">medium</a>
          </div>
          <div className="column text">
            *open to work
          </div>
        </div>
        <div className="column menu">
          <div className="menu-container">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              className={isMenuOpen || isHovering ? 'menu-button open' : 'menu-button'}
            >
              {isMenuOpen ? 'close' : (isHovering ? 'menu' : '+')}
            </button>



          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
