import React from 'react';

export default function Header() {
  return (
    <header>
      <div className="header">
        <nav className="navbar">
          <div className="nav-group">
            <a href="program\src\components\HomePage.jsx" className="nav-item">Home</a>
            <a href="program\src\components\Wishlist.jsx" className="nav-item">Wishlist</a>
          </div>
          <a href="#" className="nav-item button">Logout</a>
        </nav>
      </div>
    </header>
  );
}