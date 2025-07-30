import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Link } from 'react-scroll';
import './airpollution.css';
import waterPollutionBg from './photo/hero_background.jpg';

const Hero_section = () => {
  const [isMobile, setIsMobile] = useState(false);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <>
      <section 
        className="hero-section" 
        id="Home"
      >
        <div 
          className="hero-background"
          style={{ 
            backgroundImage: `url(${waterPollutionBg})`, 
            backgroundSize: 'cover', 
            backgroundPosition: 'center'
          }}
        >
          <div className="section-content">
            <div className="hero-details">
              <p className="natural-environment">Natural Environment</p>
              <h2 className="title">Protect Our Planet</h2>
              <h3 className="subtitle">Together We Can Reduce Water Pollution</h3>
              <p className="description">
                Welcome to our site, where we work towards creating a cleaner and healthier 
                environment by reducing Air pollution.
              </p>
              <div className="buttons">
                <Link 
                  to="#My Role" 
                  smooth={true} 
                  duration={500} 
                  className="button learn-more"
                >
                  Learn Pollution Tips
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Outlet />
    </>
  );
}

export default Hero_section;