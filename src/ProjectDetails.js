import React, { useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import LocomotiveScroll from 'locomotive-scroll';
import 'locomotive-scroll/dist/locomotive-scroll.css';
import './projects.css';
import { projects } from './projectsData';

const ProjectDetails = () => {
  const { id } = useParams();
  const stringId = String(id);
  const project = projects.find((project) => project.id === stringId);
  const scrollRef = useRef(null);
  const titleRef = useRef(null);
  const imageRefs = useRef([]);

  // Determine previous and next projects
  const currentProjectIndex = projects.findIndex((project) => project.id === stringId);
  const previousProject = projects[currentProjectIndex - 1];
  const nextProject = projects[currentProjectIndex + 1];

  const goBackHome = () => {
    window.location.href = '/';
  };

  // This function handles the navigation between projects and forces a page reload
  const navigateToProject = (projectId) => {
    window.location.href = `/project/${projectId}`;
  };

  useEffect(() => {
    let scrollInstance;
    let backButton;

    // Function to handle mouse movement and update the position of the preview div
    const handleMouseMove = (e, previewRef, projectImage) => {
      const preview = previewRef.current;
      preview.style.backgroundImage = `url(${projectImage})`;
      preview.style.left = `${e.clientX}px`;
      preview.style.top = `${e.clientY}px`;
    };

    const handleMouseOver = () => {
      backButton.style.backgroundColor = 'black';
      backButton.style.color = 'white';
    };

    const handleMouseOut = () => {
      backButton.style.backgroundColor = 'white';
      backButton.style.color = 'black';
    };

    const handleLoad = () => {
      if (scrollInstance) {
        scrollInstance.update();
      }
    };

    const handleAllImagesLoaded = () => {
      if (scrollInstance) {
        scrollInstance.update();
      }
    };

    if (scrollRef.current) {
      scrollInstance = new LocomotiveScroll({
        el: scrollRef.current,
        smooth: true,
        smoothMobile: true,
        inertia: 0.4,
      });

      scrollInstance.update();
      window.addEventListener('load', handleLoad);

      const images = document.querySelectorAll('.project-details img');
      const loadedImagesCount = images.length;
      let count = 0;
      images.forEach((image) => {
        image.onload = () => {
          count += 1;
          if (count === loadedImagesCount) {
            handleAllImagesLoaded();
          }
        };
      });

      backButton = document.querySelector('.back-button');
      if (backButton) {
        backButton.addEventListener('mouseover', handleMouseOver);
        backButton.addEventListener('mouseout', handleMouseOut);
      }

      scrollInstance.on('scroll', (obj) => {
        // Title fade-out effect
        const fadeStart = 100;
        const fadeAmount = 0.01;
        let newOpacityTitle = 1 - fadeAmount * (obj.scroll.y - fadeStart);
        if (newOpacityTitle < 0) newOpacityTitle = 0;
        if (newOpacityTitle > 1) newOpacityTitle = 1;
        if (titleRef.current) {
          titleRef.current.style.opacity = newOpacityTitle;
        }

        // Images fade-in effect
        imageRefs.current.forEach((imageRef) => {
          if (imageRef && imageRef.style) {
            const topPosition = imageRef.getBoundingClientRect().top;
            const viewportHeight = window.innerHeight;
            let newOpacityImages = 0.3 + 0.7 * (1 - topPosition / (viewportHeight / 1.1));
            if (newOpacityImages < 0.3) newOpacityImages = 0.3;
            if (newOpacityImages > 1) newOpacityImages = 1;
            imageRef.style.opacity = newOpacityImages;
          }
        });
      });
    }

    return () => {
      if (scrollInstance) {
        scrollInstance.off('scroll');
        scrollInstance.destroy();
      }
      window.removeEventListener('load', handleLoad);
      if (backButton) {
        backButton.removeEventListener('mouseover', handleMouseOver);
        backButton.removeEventListener('mouseout', handleMouseOut);
      }
    };
  }, []);

  return (
    <>
      <button
        onClick={goBackHome}
        className="back-button"
        style={{
          position: 'fixed',
          top: '2rem',
          left: '2rem',
          backgroundColor: 'white',
          color: 'black',
          border: 'none',
          borderRadius: '50%',
          cursor: 'pointer',
          padding: '10px',
          fontSize: '.7rem',
          transition: 'background-color 1s, color 1s'
        }}
      >
        ⟵ back home
      </button>
      <div ref={scrollRef} className="project-details" data-scroll-container data-scroll data-scroll-speed="1">
        <div className="header" style={{ backgroundImage: `url(${project.header})` }}>
          <p className="project-title" ref={titleRef}>{project.title}</p>
        </div>
        <div className="images">
          {project.images.map((image, index) => (
            <div className="image-container" key={index} ref={(el) => (imageRefs.current[index] = el)} style={{ opacity: 0.3 }}>
              <img src={image.src} alt={image.description} data-scroll data-scroll-speed="1.1" />
              <p data-scroll data-scroll-speed="1.4">{image.description}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="project-navigation">
        {previousProject && (
          <button onClick={() => navigateToProject(previousProject.id)} className="prev-button">
            ⟵ Previous Project
          </button>
        )}
        {nextProject && (
          <button onClick={() => navigateToProject(nextProject.id)} className="next-button">
            Next Project ⟶
          </button>
        )}
      </div>


    </>
  );
};

export default ProjectDetails;
