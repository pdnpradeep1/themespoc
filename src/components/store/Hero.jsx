// src/components/store/Hero.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../common/Button';

const Hero = ({ 
  headline, 
  subheading, 
  backgroundImage, 
  buttonText, 
  buttonLink,
  textAlignment = 'center',
  overlayOpacity = '0.3',
  fullscreenHero = false
}) => {
  const style = backgroundImage ? {
    backgroundImage: `url(${backgroundImage})`,
  } : {};

  const overlayStyle = {
    opacity: overlayOpacity
  };

  return (
    <section 
      className="hero-section" 
      style={style}
      data-text-alignment={textAlignment}
      data-fullscreen={fullscreenHero}
    >
      <div className="hero-overlay" style={overlayStyle}></div>
      <div className="hero-content">
        {headline && <h1 className="hero-headline">{headline}</h1>}
        {subheading && <p className="hero-subheading">{subheading}</p>}
        
        {buttonText && buttonLink && (
          <Link to={buttonLink}>
            <Button variant="primary" size="large">
              {buttonText}
            </Button>
          </Link>
        )}
      </div>
    </section>
  );
};

export default Hero;