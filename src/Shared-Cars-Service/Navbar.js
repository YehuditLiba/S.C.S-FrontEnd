import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCar, FaFileInvoice, FaHistory, FaInfoCircle, FaUserCircle } from 'react-icons/fa';  // אייקונים
import './Navbar.css';  // קובץ CSS נפרד
import logo from '../pictures/logo.png';

function Navbar() {
    const navigate = useNavigate();

    const handleStartJourney = () => navigate("/begin-travel");
    const handleEndJourney = () => navigate("/EndTravel");
    const handleHistory = () => navigate("/History");
    const handleeAbout = () => navigate("/About");

    return (
        <div className="navbar">
            <img src={logo} alt="Logo" className="logo" />

            <div className="nav-buttons"> {/* עטוף את הכפתורים כאן */}
                <button className="nav-button">
                    <FaUserCircle className="icon" />
                    פרופיל אישי
                </button>
                <button className="nav-button" onClick={handleHistory}>
                    <FaHistory className="icon" />
                    היסטוריה
                </button>
                <button className="nav-button" onClick={handleeAbout}>
                    <FaInfoCircle className="icon" />
                    אודותינו
                </button>
                <button className="nav-button large" onClick={handleStartJourney}>
                    <FaCar className="icon" />
                    תחילת נסיעה
                </button>
                <button className="nav-button large" onClick={handleEndJourney}>
                    <FaFileInvoice className="icon" />
                    לסיום נסיעה
                </button>
            </div>
        </div>
    );
}

export default Navbar;
