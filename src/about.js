import React, { useEffect, useRef, useState } from 'react';
import './about.css';

function About() {
  const videoRef = useRef();
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    let timer1;
    let timer2;
    videoRef.current.play();
  
    console.log('Starting the timers...');
  
    timer1 = setTimeout(() => {
      console.log('Setting video opacity...');
      videoRef.current.style.opacity = 0.3;
      timer2 = setTimeout(() => {
        console.log('Showing text...');
        setShowText(true);
      }, 600);
    }, 3000);
  
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);
  

  return (
    <div className="about-section" data-scroll data-scroll-speed="1">
      <div className="about-video">
        <video ref={videoRef} src="/port2.mp4" muted loop playsInline autoPlay />
      </div>
      <div className={`about-content ${showText ? 'visible' : ''}`} data-scroll data-scroll-speed="1.5">

        <div className="skills-title">About<br/></div>
        <div className='skills-subtitle'>me</div>
        <div className="about-text" data-scroll data-scroll-speed="2">
          Proficient in strategic planning, tech stack selection, and particularly in UI/UX design,
          I thrive in high-pressure, fast-paced environments.<br />
          <br />
          My focus is on a user-centered approach, facilitating the creative execution of digital platform development.
        </div>
      </div>
    </div>
  );
}

export default About;
