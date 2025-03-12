
// src/components/common/ErrorMessage.jsx
import React from 'react';

const ErrorMessage = ({ message = 'An error occurred. Please try again.' }) => {
  return (
    <div className="error-container">
      <div className="error-icon">!</div>
      <p className="error-message">{message}</p>
    </div>
  );
};

export default ErrorMessage;