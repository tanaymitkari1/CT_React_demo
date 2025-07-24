//CustomNotificationPrompt.js
import React from 'react';

const CustomNotificationPrompt = ({ onAccept, onReject }) => {
  return (
    <div style={{
      position: 'fixed',
      bottom: 20,
      right: 20,
      padding: '1rem',
      backgroundColor: '#fff',
      boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
      borderRadius: '8px',
      zIndex: 9999
    }}>
      <p><strong>Would you like to receive notifications?</strong></p>
      <p>We’ll only send you important updates.</p>
      <button onClick={onAccept} style={{ marginRight: '8px' }}>Yes</button>
      <button onClick={onReject}>No</button>
    </div>
  );
};

export default CustomNotificationPrompt;
