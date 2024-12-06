// src/components/Notification.js
import React from 'react';
import './notification.scss';

const Notification = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="notification-overlay">
      <div className="notification">
        <span>{message}</span>
        <button className="close-button" onClick={onClose}>
          &times; 
        </button>
      </div>
    </div>
  );
};

export default Notification;
