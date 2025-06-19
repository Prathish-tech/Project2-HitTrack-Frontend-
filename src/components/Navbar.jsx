import React from 'react';
import { Link } from 'react-router-dom';  // Added useLocation

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">🏏 Hit-Track</div>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/learn">Learn</Link>
        <Link to="/practice">Practice</Link>
        <Link to="/login">Login</Link>
        <Link to="/profile" className="profile-link">👨🏻‍💼Profile</Link>
      </div>
    </nav>
  );
}


