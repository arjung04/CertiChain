import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css'; // Import the CSS file for styling
import App from './App'; // Import the main App component

// Render the App component into the root element of the HTML
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
