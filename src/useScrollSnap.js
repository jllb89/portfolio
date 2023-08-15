import { useEffect } from 'react';

const useScrollSnap = (ref, options) => {
  useEffect(() => {
    if (ref.current) {
      let observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            window.scrollTo({ 
              top: entry.target.offsetTop, 
              behavior: 'smooth' 
            });
          }
        });
      }, options);

      observer.observe(ref.current);

      return () => observer.disconnect();
    }
  }, [ref, options]);
};

export default useScrollSnap;
