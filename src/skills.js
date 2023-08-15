import React, { useEffect, useRef, useContext } from 'react';
import { ScrollContext } from './App'; // Import the ScrollContext
import './skills.css';

function Skills() {
  const skillsRefArray = useRef([]);
  const { scrollRef } = useContext(ScrollContext); // Access the scrollRef from the context

  useEffect(() => {
    const handleScroll = () => {
      let closestSkillIndex = -1;
      let closestDistance = Infinity;
      const center = window.innerHeight / 2;

      skillsRefArray.current.forEach((skillRef, index) => {
        if (skillRef) {
          const rect = skillRef.getBoundingClientRect();
          const distanceToCenter = Math.abs(center - (rect.top + rect.height / 2));

          if (distanceToCenter < closestDistance) {
            closestDistance = distanceToCenter;
            closestSkillIndex = index;
          }
        }
      });

      skillsRefArray.current.forEach((skillRef, index) => {
        if (skillRef) {
          skillRef.style.opacity = index === closestSkillIndex ? 1 : 0.3;
        }
      });
    };

    if (scrollRef.current) {
      scrollRef.current.on('scroll', handleScroll);
    }

    return () => {
      if (scrollRef.current) {
        scrollRef.current.off('scroll', handleScroll);
      }
    };
  }, [scrollRef]);



  return (
    <div className="skills-section" data-scroll data-scroll-speed="1">
      <div className="skills-title" data-scroll data-scroll-speed="1.2">Areas of expertise &<br/></div>
      <div className='skills-subtitle' data-scroll data-scroll-speed="1.2">
      technical proficiency
      </div>
      <div className='skills-list' data-scroll data-scroll-speed="2">
        <div className="skills-text" ref={(el) => (skillsRefArray.current[0] = el)}>
        UI /UX Design & Prototyping
      </div>
      <div className="skills-text" ref={(el) => (skillsRefArray.current[1] = el)}>
        Project & Cross-functional Team Management
      </div>
      <div className="skills-text" ref={(el) => (skillsRefArray.current[2] = el)}>
        Creative Direction & Brand Development
      </div>
      <div className="skills-text" ref={(el) => (skillsRefArray.current[3] = el)}>
        Best Practices & UX Research Methodologies
      </div>
      <div className="skills-text" ref={(el) => (skillsRefArray.current[4] = el)}>
        Team Collaboration & Leadership
      </div>
      <div className="skills-text" ref={(el) => (skillsRefArray.current[5] = el)}>
        Customer Service / People Skills
      </div>
      <div className="skills-text" ref={(el) => (skillsRefArray.current[6] = el)}>
        Basic Programming (HTML, CSS, JS)
      </div>
    </div>
    </div>
  );
}

export default Skills;


