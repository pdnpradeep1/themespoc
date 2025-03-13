// src/themes/ModernTheme/components/ModernHero.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../components/common/Button';

const ModernHero = ({ 
  slides = [], 
  autoplay = true,
  interval = 5000,
  showIndicators = true,
  showArrows = true,
  textAlignment = 'center',
  overlayOpacity = '0.4',
  fullscreenHero = false,
  primaryButtonVariant = 'primary',
  secondaryButtonVariant = 'secondary'
}) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Default slide if none provided
  if (slides.length === 0) {
    slides = [{
      headline: 'Welcome to our Store',
      subheading: 'Discover amazing products at great prices',
      backgroundImage: 'https://picsum.photos/1600/800',
      primaryButtonText: 'Shop Now',
      primaryButtonLink: '/products',
      secondaryButtonText: 'Learn More',
      secondaryButtonLink: '/about'
    }];
    
  }

  // Handle autoplay
  useEffect(() => {
    if (!autoplay || isPaused || slides.length <= 1) return;
    
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, interval);
    
    return () => clearInterval(timer);
  }, [autoplay, interval, slides.length, isPaused]);

  // Navigate to next slide
  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % slides.length);
  };

  // Navigate to previous slide
  const prevSlide = () => {
    setActiveSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  // Go to specific slide
  const goToSlide = (index) => {
    setActiveSlide(index);
  };

  return (
    <section 
      className="modern-hero"
      data-text-alignment={textAlignment}
      data-fullscreen={fullscreenHero}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="modern-hero-slider">
        {slides.map((slide, index) => {
          const isActive = index === activeSlide;
          const slideStyle = {
            backgroundImage: slide.backgroundImage ? `url(${slide.backgroundImage})` : undefined,
            opacity: isActive ? 1 : 0,
            zIndex: isActive ? 1 : 0
          };
          
          const overlayStyle = {
            backgroundColor: `rgba(0, 0, 0, ${overlayOpacity})`
          };

          return (
            <div 
              key={index}
              className={`hero-slide ${isActive ? 'active' : ''}`}
              style={slideStyle}
            >
              <div className="hero-overlay" style={overlayStyle}></div>
              <div className="hero-content">
                {slide.headline && <h1 className="hero-headline">{slide.headline}</h1>}
                {slide.subheading && <p className="hero-subheading">{slide.subheading}</p>}
                
                <div className="hero-buttons">
                  {slide.primaryButtonText && slide.primaryButtonLink && (
                    <Link to={slide.primaryButtonLink}>
                      <Button variant={primaryButtonVariant} size="large" className="primary-cta">
                        {slide.primaryButtonText}
                      </Button>
                    </Link>
                  )}
                  
                  {slide.secondaryButtonText && slide.secondaryButtonLink && (
                    <Link to={slide.secondaryButtonLink}>
                      <Button variant={secondaryButtonVariant} size="large" className="secondary-cta">
                        {slide.secondaryButtonText}
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {showArrows && slides.length > 1 && (
        <div className="hero-navigation">
          <button 
            className="hero-nav-button prev" 
            onClick={prevSlide}
            aria-label="Previous slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
          <button 
            className="hero-nav-button next" 
            onClick={nextSlide}
            aria-label="Next slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
      )}
      
      {showIndicators && slides.length > 1 && (
        <div className="hero-indicators">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`hero-indicator ${index === activeSlide ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            ></button>
          ))}
        </div>
      )}
    </section>
  );
};

export default ModernHero;