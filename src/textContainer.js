import React, { useRef, useState, useEffect } from 'react';

function TextContainer() {
  const textContainerRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [lensCenter, setLensCenter] = useState({ x: 0, y: 0 });
  const [delayedLensCenter, setDelayedLensCenter] = useState({ x: 0, y: 0 });
  const [scrollPosition, setScrollPosition] = useState(0);
  const [showScrollText, setShowScrollText] = useState(true);
  const [showTextContainer, setShowTextContainer] = useState(false);

  useEffect(() => {
    const lerp = (start, end, factor) => start + (end - start) * factor;
    const factor = 0.02;

    const animate = () => {
      setDelayedLensCenter(prev => ({
        x: lerp(prev.x, lensCenter.x, factor),
        y: lerp(prev.y, lensCenter.y, factor)
      }));
      requestAnimationFrame(animate);
    };
    animate();
  }, [lensCenter]);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (scrollPosition > 100) {
      setShowScrollText(false);
    } else {
      setShowScrollText(true);
    }
  }, [scrollPosition]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTextContainer(true);
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  const handleMouseMove = (e) => {
    const containerOffset = textContainerRef.current.getBoundingClientRect();
    setLensCenter({
      x: e.clientX - containerOffset.left - window.scrollX,
      y: e.clientY - containerOffset.top - window.scrollY,
    });
  };

  const originalSpanStyle = {
    position: 'relative',
    WebkitMaskImage: isHovering ? 
      `radial-gradient(circle 7.5rem at ${delayedLensCenter.x}px ${delayedLensCenter.y}px, transparent 99%, white 100%)` : 
      'none',
    maskImage: isHovering ? 
      `radial-gradient(circle 7.5rem at ${delayedLensCenter.x}px ${delayedLensCenter.y}px, transparent 99%, white 100%)` : 
      'none',
  };

  const translatedSpanStyle = {
    position: 'absolute',
    left: 0,
    top: 0,
    pointerEvents: 'none',
    opacity: isHovering ? 1 : 0,
    clipPath: isHovering ? `circle(7rem at ${delayedLensCenter.x}px ${delayedLensCenter.y}px)` : 'none',
    filter: 'blur(.03rem)'
  };

  return (
    <div
      className={`textContainer ${showTextContainer ? "fade-in" : "fade-out"}` }
      ref={textContainerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      data-scroll data-scroll-speed="1"
    >
      <div className="original presentation-text" style={originalSpanStyle} >
      Detail-oriented Senior Product Manager & Designer possessing +9 years of experience specializing in driving global teams to create engaging and innovative SaaS solutions from ground zero.
      </div>
      {isHovering && (
        <div className="translated presentation-text" style={translatedSpanStyle}>
          Diseñador de Producto Senior con gusto por los detalles y más de 9 años de experiencia liderando equipos gloables de desarrollo ofreciendo soluciones SaaS y plataformas digitales atractivas e innovadoras.
        </div>
      )}
      {showScrollText && (
        <div className={`scroll-prompt ${!showScrollText ? "hidden" : ""}`} data-scroll data-scroll-speed="2.5">
  - keep scrolling -
</div>
      )}
    </div>
  );
}

export default TextContainer;
