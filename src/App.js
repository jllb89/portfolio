import React, { createContext, useRef, useLayoutEffect, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './navbar';
import TextContainer from './textContainer';
import About from './about';
import Skills from './skills';
import Works from './works';
import Footer from './footer';
import ProjectDetails from './ProjectDetails'; // Import your new component
import LocomotiveScroll from 'locomotive-scroll';
import 'locomotive-scroll/dist/locomotive-scroll.css';
import './App.css';

export const ScrollContext = createContext();

function Home({ scrollRef, homeRef, aboutRef, worksRef, contactRef }) {
  const skillsRefArray = useRef([]);

  useLayoutEffect(() => {
    if (!document.querySelector('.scroll-container')) return;

    scrollRef.current = new LocomotiveScroll({
      el: document.querySelector('.scroll-container'),
      smooth: true,
      smoothMobile: false,
      inertia: 0.5,
    });

    const handleResize = () => {
      scrollRef.current.update();
    };

    window.addEventListener('resize', handleResize);

    setTimeout(() => {
      scrollRef.current.update();
    }, 500);

    return () => {
      if (scrollRef.current) {
        scrollRef.current.destroy();
        window.removeEventListener('resize', handleResize);
      }
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      let closestSkillIndex = 0;
      let closestDistance = Infinity;
      const center = window.innerHeight / 2;

      skillsRefArray.current.forEach((skillRef, index) => {
        if (skillRef) {
          const rect = skillRef.getBoundingClientRect();
          const distanceToCenter = Math.abs(rect.top + rect.height / 2 - center);
          if (distanceToCenter < closestDistance) {
            closestSkillIndex = index;
            closestDistance = distanceToCenter;
          }
        }
      });

      skillsRefArray.current.forEach((skillRef, index) => {
        if (skillRef && skillRef.style) {
          if (index === closestSkillIndex) {
            skillRef.style.opacity = 1;
          } else {
            skillRef.style.opacity = 0.3;
          }
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
    <div className="App scroll-container" data-scroll-container>
      <div ref={homeRef} className="CenterContainer animated-background">
        <TextContainer />
      </div>
      <div ref={aboutRef} className="About">
        <About />
      </div>
      <div className="Skills">
        <Skills />
      </div>
      <div ref={worksRef} className="works">
        <Works />
      </div>
      <div ref={contactRef} className="Footer">
        <Footer
          homeRef={homeRef}
          aboutRef={aboutRef}
          worksRef={worksRef}
          contactRef={contactRef}
        />
      </div>
    </div>
  );
}


function RouterContent() {
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const worksRef = useRef(null);
  const contactRef = useRef(null);
  const scrollRef = useRef(null);
  const skillsRefArray = useRef([]);
  const location = useLocation();
  const [showNavbar, setShowNavbar] = useState(true);
  const [fading, setFading] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);

  const handleTransition = () => {
    if (location.pathname.startsWith('/project')) {
      setFading(true);
      setTimeout(() => {
        setFading(false);
        setFadeIn(true);
        setShowNavbar(false);
      }, 2000); // The duration should match the CSS transition time
    } else {
      setFading(true);
      setFadeIn(false);
      setShowNavbar(true);
      setTimeout(() => {
        setFading(false);
      }, 2000); // The duration should match the CSS transition time
    }
  };

  useEffect(() => {
    handleTransition();
  }, [location.pathname]);

  useEffect(() => {
    if (location.pathname.startsWith('/project')) {
      setShowNavbar(false);
    } else {
      setShowNavbar(true);
    }
  }, [location.pathname]);

  return (
    <ScrollContext.Provider value={{ skillsRefArray, scrollRef }}>
      {showNavbar && (
        <Navbar
          homeRef={homeRef}
          aboutRef={aboutRef}
          worksRef={worksRef}
          contactRef={contactRef}
        />
      )}
      <Routes>
        <Route path="/" element={
          <Home
            scrollRef={scrollRef}
            homeRef={homeRef}
            aboutRef={aboutRef}
            worksRef={worksRef}
            contactRef={contactRef}
          />
        }
        />
        <Route path="/project/:id" element={<ProjectDetails />} />
      </Routes>
    </ScrollContext.Provider>
  );
}


function App() {
  return (
    <Router>
      <RouterContent />
    </Router>
  );
}

export default App;
