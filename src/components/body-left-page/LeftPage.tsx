import React, { useState } from "react";
import { FaTachometerAlt, FaPlus, FaMap, FaNewspaper, FaCloudscale, FaVideo, FaTasks, FaBars } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

const LeftPage: React.FC = () => {
  const [isMenuVisible, setIsMenuVisible] = useState(true);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [isPopupMenuVisible, setIsPopupMenuVisible] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  const togglePopupMenu = () => {
    setIsPopupMenuVisible(!isPopupMenuVisible);
  };

  return (
    <div className={`d-flex position-relative ${isSidebarVisible ? 'vh-100' : 'vh-auto'}`}>
      {isSidebarVisible && (
        <div className={`d-flex p-2 ${isMenuVisible ? 'sidebar-expanded' : 'sidebar-collapsed'} vh-100`}>
          <button
            className={`btn btn-primary position-absolute top-0 ${isMenuVisible ? 'end-0' : 'start-0'}`}
            onClick={toggleMenu}
          >
            {isMenuVisible ? '✖' : '☰'}
          </button>
          <ul className="list-unstyled mt-4">
            <li className="my-3">
              <a href="#" className="d-flex align-items-center" onClick={() => navigate('/')}>
                <FaTachometerAlt className={`me-2 ${isMenuVisible ? '' : 'mx-auto'}`} />
                {isMenuVisible && 'Dashboard'}
              </a>
            </li>
            <li className="my-3">
              <a href="#" className="d-flex align-items-center" onClick={() => navigate('/generate-dynamic-table')}>
                <FaPlus className={`me-2 ${isMenuVisible ? '' : 'mx-auto'}`} />
                {isMenuVisible && 'Dynamic Table'}
              </a>
            </li>
            <li className="my-3">
              <a href="#" className="d-flex align-items-center" onClick={() => navigate('/map')}>
                <FaMap className={`me-2 ${isMenuVisible ? '' : 'mx-auto'}`} />
                {isMenuVisible && 'Maps'}
              </a>
            </li>
            <li className="my-3">
              <a href="#" className="d-flex align-items-center" onClick={() => navigate('/news')}>
                <FaNewspaper className={`me-2 ${isMenuVisible ? '' : 'mx-auto'}`} />
                {isMenuVisible && 'News'}
              </a>
            </li>
            <li className="my-3">
              <a href="#" className="d-flex align-items-center" onClick={() => navigate('/collections')}>
                <FaCloudscale className={`me-2 ${isMenuVisible ? '' : 'mx-auto'}`} />
                {isMenuVisible && 'Collection'}
              </a>
            </li>
            <li className="my-3">
              <a href="#" className="d-flex align-items-center" onClick={() => navigate('/videos')}>
                <FaVideo className={`me-2 ${isMenuVisible ? '' : 'mx-auto'}`} />
                {isMenuVisible && 'Videos'}
              </a>
            </li>
            <li className="my-3">
              <a href="#" className="d-flex align-items-center" onClick={() => navigate('/todos')}>
                <FaTasks className={`me-2 ${isMenuVisible ? '' : 'mx-auto'}`} />
                {isMenuVisible && 'Todos'}
              </a>
            </li>
          </ul>
          <button
            className="btn btn-secondary position-absolute bottom-0 start-0"
            onClick={toggleSidebar}
          >
            {isSidebarVisible ? '<' : '>'}
          </button>
        </div>
      )}
      {!isSidebarVisible && (
        <button
          className="btn btn-secondary position-absolute top-0 start-0"
          onClick={toggleSidebar}
        >
          {'>'}
        </button>
      )}
      <button
        className="btn btn-primary position-absolute top-0 start-0 d-md-none"
        onClick={togglePopupMenu}
      >
        <FaBars />
      </button>
      {isPopupMenuVisible && (
        <div className="popup-menu top-0 start-0 bg-light p-3">
          <ul className="list-unstyled">
            <li className="my-3">
              <a href="#" className="d-flex align-items-center" onClick={() => { navigate('/'); togglePopupMenu(); }}>
                <FaTachometerAlt className="me-2" />
                Dashboard
              </a>
            </li>
            <li className="my-3">
              <a href="#" className="d-flex align-items-center" onClick={() => { navigate('/generate-dynamic-table'); togglePopupMenu(); }}>
                <FaPlus className="me-2" />
                Dynamic Table
              </a>
            </li>
            <li className="my-3">
              <a href="#" className="d-flex align-items-center" onClick={() => { navigate('/map'); togglePopupMenu(); }}>
                <FaMap className="me-2" />
                Maps
              </a>
            </li>
            <li className="my-3">
              <a href="#" className="d-flex align-items-center" onClick={() => { navigate('/news'); togglePopupMenu(); }}>
                <FaNewspaper className="me-2" />
                News
              </a>
            </li>
            <li className="my-3">
              <a href="#" className="d-flex align-items-center" onClick={() => { navigate('/collections'); togglePopupMenu(); }}>
                <FaCloudscale className="me-2" />
                Collection
              </a>
            </li>
            <li className="my-3">
              <a href="#" className="d-flex align-items-center" onClick={() => { navigate('/videos'); togglePopupMenu(); }}>
                <FaVideo className="me-2" />
                Videos
              </a>
            </li>
            <li className="my-3">
              <a href="#" className="d-flex align-items-center" onClick={() => { navigate('/todos'); togglePopupMenu(); }}>
                <FaTasks className="me-2" />
                Todos
              </a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default LeftPage;