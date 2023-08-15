import React, { useEffect, useRef, useState } from 'react';
import './about.css';

function About() {
  const videoRef = useRef();
  const textRef = useRef();
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    let timer1;
    let timer2;
    videoRef.current.play();

    // Opacity change for video
    timer1 = setTimeout(() => {
      videoRef.current.style.transition = 'opacity 0.5s ease-in'; // Add the CSS transition property
      videoRef.current.style.opacity = 0.3;
    }, 3000);

    // Text entry
    timer2 = setTimeout(() => {
      setShowText(true);
    }, 3500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <div className="about-section" data-scroll data-scroll-speed="1">
      <div className="about-video">
        <video ref={videoRef} src="/your-video.mp4" muted loop playsInline autoPlay />
      </div>
      <div
        className={`about-content ${showText ? 'fade-in' : 'fade-out'}`}
        ref={textRef}
        style={{ visibility: showText ? 'visible' : 'hidden', opacity: showText ? 1 : 0 }} data-scroll data-scroll-speed="1.5"
      >
              <div className="skills-title" >About<br/></div>
      <div className='skills-subtitle'>
      me
      </div>
        <div className={`about-text ${showText ? 'fade-in' : 'fade-out'}`} data-scroll data-scroll-speed="2">
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
