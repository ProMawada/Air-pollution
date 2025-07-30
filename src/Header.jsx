import React, { useEffect, useState } from 'react';
import './Header.css';

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [iconColor, setIconColor] = useState('rgb(255,255,255)');

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.querySelector('.hero-section');
      const heroHeight = heroSection ? heroSection.offsetHeight : 0;
      const scrollPosition = window.scrollY;

      if (heroSection) {
        if (scrollPosition < heroHeight) {
          const opacity = scrollPosition / heroHeight;
          document.querySelector('header').style.backgroundColor = `rgba(16, 16, 16, ${opacity})`;
          const icColor = `rgb(${255 - Math.floor(255 * opacity)},${255 - Math.floor(255 * opacity)},${255 - Math.floor(255 * opacity)})`;
          setIconColor(icColor);
        } else {
          document.querySelector('header').style.backgroundColor = '#87CEEB';
          setIconColor('#87CEEB');
        }
      }

      setScrolled(scrollPosition > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) setMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header className={scrolled ? 'scrolled' : ''}>
      <nav className="navbar">
        <div className="nav-logo">
          <a href=" / " className="logo-text">Air Pollution 🌍</a>
          <button
            className="menu-toggle"
            aria-label="Open Menu"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ color: iconColor }}
          >
            <span className="menu-icon">&#9776;</span>
          </button>
        </div>
        <ul className={`nav-menu${menuOpen ? ' open' : ''}`}>
          <li><a href="#Home" className="nav-link">Home</a></li>
          <li><a href="#about" className="nav-link">About</a></li>
          <li><a href="#My Role" className="nav-link">My Role</a></li>
          <li><a href="#Quiz Section" className="nav-link">Quiz Section</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;