import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom'; 
import { projects } from './projectsData'; 
import './works.css';

function BackgroundImage({ src, alt, ...props }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setLoaded(true);
    };
  }, [src]);

  return (
    <>
      <img src={src} alt={alt} style={{ display: 'none' }} />
      {loaded && (
        <div
          {...props}
          style={{ ...props.style, backgroundImage: `url(${src})` }}
        />
      )}
    </>
  );
}

function Works() {
  const [activeProject, setActiveProject] = useState(0);
  const intervalId = useRef(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  const handleProjectLeave = () => {
    clearInterval(intervalId.current);
    intervalId.current = setInterval(() => {
      setActiveProject((prevActiveProject) => (prevActiveProject + 1) % projects.length);
    }, 5000);
  };

  useEffect(() => {
    intervalId.current = setInterval(() => {
      setActiveProject((prevActiveProject) => (prevActiveProject + 1) % projects.length);
    }, 5000);

    return () => {
      clearInterval(intervalId.current);
    };
  }, [projects.length]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const lerpX = cursorPos.x + (e.clientX - cursorPos.x) * .02;
      const lerpY = cursorPos.y + (e.clientY - cursorPos.y) * .02;
      setCursorPos({ x: lerpX, y: lerpY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [cursorPos]);

  const [isCursorActive, setIsCursorActive] = useState(false);

  const handleMouseMove = (e) => {
    setIsCursorActive(true);
    setCursorPos({ x: e.pageX, y: e.pageY });
  };

  const handleMouseLeave = () => {
    setIsCursorActive(false);
  };

  const CustomCursor = () => (
    <div
      className={`custom-cursor ${isCursorActive ? 'active' : ''}`}
      style={{
        top: cursorPos.y,
        left: cursorPos.x,
      }}
    >
      <span className="custom-cursor-text">view project <br />⟶</span>
    </div>
  );

  return (
    <div className="works-div" data-scroll data-scroll-speed="1">
      <div className="projects-container">
        <Link to={`/project/${projects[activeProject].id}`}>
          <BackgroundImage
            className="background-image"
            src={projects[activeProject].projectImage}
            alt={projects[activeProject].title}
          />
        </Link>
        <div className="project-titles" data-scroll data-scroll-speed="3">
          <div className="skills-title">case<br /></div>
          <div className='skills-subtitle'>studies</div>
          {projects.map((project, index) => (
            <div
              key={index}
              onMouseLeave={handleProjectLeave}
              className={`project ${activeProject === index ? 'active' : ''}`}
            >
              <Link to={`/project/${project.id}`}>{project.title}</Link>
            </div>
          ))}
        </div>
        <div className='open-mobile'>
          tap on image to open project ⟶
        </div>
      </div>
      <CustomCursor />
    </div>
  );
}

export default Works;
