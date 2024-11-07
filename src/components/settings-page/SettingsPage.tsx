import React, { useState, useEffect } from 'react';
import './style.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Settings: React.FC = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [language, setLanguage] = useState('English');
    const [notifications, setNotifications] = useState(true);
    const [privacy, setPrivacy] = useState('Public');

    useEffect(() => {
        const savedMode = localStorage.getItem('darkMode');
        if (savedMode) {
            setIsDarkMode(JSON.parse(savedMode));
            document.body.classList.toggle('dark-mode', JSON.parse(savedMode));
        }
    }, []);

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
        document.body.classList.toggle('dark-mode', !isDarkMode);
        localStorage.setItem('darkMode', JSON.stringify(!isDarkMode));
    };

    const handleLanguageChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setLanguage(e.target.value);
    };

    const handleNotificationsChange = () => {
        setNotifications(!notifications);
    };

    const handlePrivacyChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setPrivacy(e.target.value);
    };

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Settings</h1>
            <div className="card mb-4">
                <div className="card-body">
                    <h5 className="card-title">General Settings</h5>
                    <div className="form-check form-switch mb-3">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="darkModeSwitch"
                            checked={isDarkMode}
                            onChange={toggleDarkMode}
                        />
                        <label className="form-check-label" htmlFor="darkModeSwitch">
                            {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                        </label>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="languageSelect" className="form-label">Language</label>
                        <select
                            id="languageSelect"
                            className="form-select"
                            value={language}
                            onChange={handleLanguageChange}
                        >
                            <option value="English">English</option>
                            <option value="Spanish">Spanish</option>
                            <option value="French">French</option>
                            <option value="German">German</option>
                        </select>
                    </div>
                    <div className="form-check form-switch mb-3">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="notificationsSwitch"
                            checked={notifications}
                            onChange={handleNotificationsChange}
                        />
                        <label className="form-check-label" htmlFor="notificationsSwitch">
                            {notifications ? 'Disable Notifications' : 'Enable Notifications'}
                        </label>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="privacySelect" className="form-label">Privacy</label>
                        <select
                            id="privacySelect"
                            className="form-select"
                            value={privacy}
                            onChange={handlePrivacyChange}
                        >
                            <option value="Public">Public</option>
                            <option value="Private">Private</option>
                            <option value="Friends Only">Friends Only</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Account Settings</h5>
                    <button className="btn btn-danger">Delete Account</button>
                </div>
            </div>
        </div>
    );
};

export default Settings;
