// src/themes/ModernTheme/components/ModernTestimonials.jsx
import React, { useState, useEffect } from 'react';

const ModernTestimonials = ({ 
  testimonials = [], 
  title = 'What Our Customers Say',
  autoplay = true,
  interval = 5000,
  style = 'cards' // cards, minimal, quotes
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  
  // Default testimonials if none provided
  if (!testimonials || testimonials.length === 0) {
    testimonials = [
      {
        id: 1,
        name: 'John Smith',
        avatar: '/assets/placeholder-images/avatar1.jpg',
        role: 'Verified Customer',
        content: 'Amazing products and great customer service. I will definitely be shopping here again!',
        rating: 5
      },
      {
        id: 2,
        name: 'Jane Doe',
        avatar: '/assets/placeholder-images/avatar2.jpg',
        role: 'Verified Customer',
        content: 'The quality of the products exceeded my expectations. Shipping was fast and everything arrived in perfect condition.',
        rating: 4
      },
      {
        id: 3,
        name: 'Mike Johnson',
        avatar: '/assets/placeholder-images/avatar3.jpg',
        role: 'Verified Customer',
        content: 'Great experience from start to finish. The website is easy to navigate and the checkout process was smooth.',
        rating: 5
      }
    ];
  }
  
  // Handle autoplay
  useEffect(() => {
    if (!autoplay || isPaused || testimonials.length <= 1) return;
    
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, interval);
    
    return () => clearInterval(timer);
  }, [autoplay, interval, testimonials.length, isPaused]);
  
  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };
  
  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };
  
  const goToIndex = (index) => {
    setActiveIndex(index);
  };
  
  // Render star rating
  const renderStars = (rating) => {
    return (
      <div className="testimonial-rating">
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i} className={`star ${i < Math.round(rating) ? 'filled' : ''}`}>★</span>
        ))}
      </div>
    );
  };

  return (
    <section className="modern-testimonials" data-style={style}>
      <div className="container">
        <h2 className="section-title">{title}</h2>
        
        <div 
          className="testimonials-slider"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="testimonials-wrapper" style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
            {testimonials.map((testimonial, index) => (
              <div key={testimonial.id} className="testimonial-item">
                {style !== 'minimal' && testimonial.avatar && (
                  <div className="testimonial-avatar">
                    <img src={testimonial.avatar} alt={testimonial.name} />
                  </div>
                )}
                
                <div className="testimonial-content">
                  {style === 'quotes' && (
                    <div className="quote-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48" height="48" fill="currentColor" opacity="0.2">
                        <path d="M11.3,6.5H9.9C9.3,5.8,8.9,4.7,8.9,4h2.1c0.3,0,0.5-0.2,0.5-0.5v-3C11.5,0.2,11.3,0,11,0H6.5C6.2,0,6,0.2,6,0.5v3.4c0,4.6,2.3,5.8,3.3,6.2c0.1,0,0.2,0.1,0.3,0.1c0.2,0,0.3-0.1,0.4-0.2c0.2-0.2,0.2-0.5,0-0.7C9.9,9.2,9.2,8.7,8.6,7.7c0,0,0,0,0,0h2.2c0.3,0,0.5-0.2,0.5-0.5V6.5z M5.5,9.6c-0.1,0.1-0.2,0.3-0.1,0.5s0.2,0.3,0.3,0.3c0.1,0.1,0.2,0.1,0.3,0.1c0.4,0,0.7-0.1,1.1-0.2C7.3,10.1,7.5,10,7.6,9.7c0.1-0.2,0-0.5-0.2-0.7C6.3,8.4,5.7,7.9,5.3,7.1c0,0,0,0,0,0h2.2c0.3,0,0.5-0.2,0.5-0.5V5.9H6.6C6,5.2,5.6,4.1,5.6,3.4h2.1c0.3,0,0.5-0.2,0.5-0.5v-3C8.2,0.2,8,0,7.7,0H3.2C2.9,0,2.7,0.2,2.7,0.5v3.4c0,0.1,0,0.1,0,0.2C2.8,8.7,5.1,9.5,5.5,9.6z" />
                      </svg>
                    </div>
                  )}
                  
                  <p className="testimonial-text">{testimonial.content}</p>
                  
                  {testimonial.rating && renderStars(testimonial.rating)}
                  
                  <div className="testimonial-author">
                    <h4 className="author-name">{testimonial.name}</h4>
                    {testimonial.role && <p className="author-role">{testimonial.role}</p>}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {testimonials.length > 1 && (
            <div className="testimonial-nav">
              <button className="nav-button prev" onClick={handlePrev} aria-label="Previous testimonial">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
              </button>
              <div className="testimonial-dots">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    className={`dot ${index === activeIndex ? 'active' : ''}`}
                    onClick={() => goToIndex(index)}
                    aria-label={`Go to testimonial ${index + 1}`}
                  ></button>
                ))}
              </div>
              <button className="nav-button next" onClick={handleNext} aria-label="Next testimonial">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ModernTestimonials;