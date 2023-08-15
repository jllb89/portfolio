import React, { useContext } from 'react';
import { ScrollContext } from './App';
import './footer.css';

function Footer({ homeRef, aboutRef, worksRef, contactRef }) {
  const { scrollRef } = useContext(ScrollContext);

  const handleScrollTo = (sectionRef) => {
    if (scrollRef && scrollRef.current && sectionRef && sectionRef.current) {
      scrollRef.current.scrollTo(sectionRef.current, { duration: 800, easing: [0.19, 1, 0.22, 1] });
    }
  };

  return (
    <footer className="footer-container" data-scroll data-scroll-speed="1">
      <div className="footer-text" data-scroll data-scroll-speed="0.5">
        WOULD LOVE TO HEAR FROM YOU.
        <div className='contact-text'>
        Feel free to reach out if you want to collaborate or simply have a chat.
        </div>
        <div className='email-text'>
        <a href="mailto:hi@jl-lb.com" className='email-link'>hi@jl-lb.com <span className="arrow">→</span></a>
        </div>
      </div>
      <div className="footer-columns" data-scroll data-scroll-speed="1">
        <div className="footer-column" data-scroll data-scroll-speed="0.5">
          <a onClick={() => handleScrollTo(homeRef)}>home</a>
          <a onClick={() => handleScrollTo(aboutRef)}>about</a>
          <a onClick={() => handleScrollTo(worksRef)}>works</a>
          <a onClick={() => handleScrollTo(contactRef)}>contact</a>
        </div>
        <div className="footer-column" data-scroll data-scroll-speed="0.5">
        <a href={`${process.env.PUBLIC_URL}/jllb2023.pdf`} download>cv</a>
            <a href="https://github.com/your-github-username" target="_blank" rel="noopener noreferrer">github</a>
            <a href="https://medium.com/@your-medium-username" target="_blank" rel="noopener noreferrer">medium</a>
        </div>
      </div>
      <div 
        className="back-to-top-button" 
        onClick={() => handleScrollTo(homeRef)}
      >
        top ↑
      </div>    </footer>
  );
}

export default Footer;
