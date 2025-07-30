import React, { useEffect, useRef, useState } from 'react';
import './About.css';
import 'animate.css';

import aboutImage from './photo/about_air_pollution.jpg';

const About_section = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section 
      className="about-section" 
      id="about"
      ref={sectionRef}
    >
      <div className="section-content">
        <div className={`about-details ${isVisible ? 'animate__animated animate__fadeInLeft' : ''}`}>
          <h2 className="section-title">About Soil Pollution</h2>
          <p className="text">
              <strong>Understand Air Pollution:</strong> Harmful substances in the air can affect human health and the environment.<br />
              <strong>Sources:</strong> Vehicle emissions, industrial discharges, burning of fossil fuels.<br />
              <strong>Health Effects:</strong> Respiratory issues, cardiovascular diseases, cancer.<br />
              <strong>Prevention:</strong> Use public transport, reduce energy consumption, support clean energy.<br />
              <strong>Remediation:</strong> Air purifiers, planting trees, using environmentally friendly products.<br />
              <strong>Monitoring:</strong> Regular air quality checks.<br />
              <strong>Community Involvement:</strong> Educate and encourage sustainable practices.<br />
              <strong>Regulations:</strong> Support and follow environmental laws.<br />
              <strong>Reduce, Reuse, Recycle:</strong> Minimize waste.<br />
              <strong>Use Organic Products:</strong> Choose products with fewer harmful chemicals.<br />
            </p>
          
          {/* <div className="social-link-list">
            <a href="#" className="social-link" aria-label="Facebook">📘</a>
            <a href="#" className="social-link" aria-label="Twitter">🐦</a>
            <a href="#" className="social-link" aria-label="Instagram">📷</a>
            <a href="#" className="social-link" aria-label="LinkedIn">💼</a>
          </div> */}
        </div>
        
        <div className={`about-image-wrapper ${isVisible ? 'animate__animated animate__fadeInRight' : ''}`}>
          <img 
            src={aboutImage} 
            alt="About Soil Pollution - Environmental awareness and protection" 
            className="about-image"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}

export default About_section;




















