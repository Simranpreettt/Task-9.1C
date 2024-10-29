import React from 'react';
import { Input, Button } from 'semantic-ui-react';
import './Header.css';

const Header = ({ handleLoginClick, handleLogoutClick, isLoggedIn }) => { // Accept new props
  return (
    <header className="header">
      <div className="logo">DEV@Deakin</div>
      <div className="search-bar">
        <Input fluid icon='search' placeholder='Search...' />
      </div>
      <div className="header-buttons">
        <Button>Post</Button>

        {/* Conditionally render Login or Logout button based on login status */}
        {isLoggedIn ? (
          <Button onClick={handleLogoutClick}>Logout</Button>  // Show Logout when logged in
        ) : (
          <Button onClick={handleLoginClick}>Login</Button>   // Show Login when logged out
        )}
      </div>
    </header>
  );
}

export default Header;
