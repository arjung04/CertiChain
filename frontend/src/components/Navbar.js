import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/">Dashboard</Link></li>
        <li><Link to="/upload">Upload Certificate</Link></li>
        <li><Link to="/verify">Verify Certificate</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
