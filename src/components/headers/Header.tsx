import React, { useState, useEffect } from "react";
import './style.css';
import profileImage from '../../assets/profile.png';
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
    console.log("Dropdown visibility toggled:", !dropdownVisible);
  };

  const handleDropdownClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    console.log("Dropdown clicked");
  };

  const handleLogout = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle('dark-mode', !isDarkMode);
    document.body.classList.toggle('light-mode', isDarkMode);
    console.log("Dark mode toggled:", !isDarkMode);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownVisible && !(event.target as HTMLElement).closest('.profile-icon')) {
        setDropdownVisible(false);
        console.log("Clicked outside, dropdown hidden");
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [dropdownVisible]);

  return (
    <header className="bg-primary text-white d-flex justify-content-between align-items-center p-3">
      <nav>
        <a className="text-white mx-2" onClick={() => navigate('/')}>Home</a>
        <a className="text-white mx-2" onClick={() => navigate('/about')}>About</a>
        <a className="text-white mx-2" onClick={() => navigate('/portfolio')}>Portfolio</a>
      </nav>
      <div className="d-flex align-items-center">
        <i
          className={`bi ${isDarkMode ? 'bi-sun' : 'bi-moon'} mx-3`}
          style={{ cursor: 'pointer' }}
          onClick={toggleDarkMode}
        ></i>
        <div className="profile-icon position-relative" onClick={handleDropdownClick}>
          <img
            src={profileImage}
            alt="Profile"
            className="rounded-circle"
            style={{ width: '40px', height: '40px', cursor: 'pointer' }}
            onClick={toggleDropdown}
          />
          <div
            className={`dropdown-menu ${dropdownVisible ? 'show' : ''}`}
            onClick={handleDropdownClick}
          >
            <div className="dropdown-item">Welcome, user12345678</div>
            <div className="dropdown-item" onClick={() => navigate('/profile')}>Profile</div>
            <div className="dropdown-item" onClick={() => navigate('/settings')}>Settings</div>
            <div className="dropdown-item" onClick={handleLogout}>Logout</div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;