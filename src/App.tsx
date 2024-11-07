import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import './style.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from './components/headers/Header';
import Footer from './components/footer/Footer';
import LeftPage from './components/body-left-page/LeftPage';
import RightPage from './components/body-right-page/RightPage';
import MapPage from './components/map/MapPage';
import DynamicTable from './components/dynamic-table/DynamicTable';
import MainPage from './components/main-page/MainPage';
import PortfolioPage from './components/portfolio/PortfolioPage';
import ProfilePage from './components/profile-page/ProfilePage';
import AboutPage from './components/about-page/AboutPage';
import CalendarComponent from './components/calender/CalenderComponent';
import TodoComponent from './components/todo/TodoComponent';
import { TodoProvider } from './contexts/TodoContext';
import NewsPage from './components/news/NewsPage';
import VideosPage from './components/videos/VideosPage';
import CollectionsPage from './components/collections/CollectionPage';
import Settings from './components/settings-page/SettingsPage';

const App: React.FC = () => {
  return (
    <TodoProvider>
      <Router>
        <div className="d-flex flex-column min-vh-100">
          <Header />
          <div className="custom-container flex-grow-1 d-flex">
            <div className="row flex-grow-1">
              <div className="col-md-2 left-page">
                <LeftPage />
              </div>
              <div className="col-md-8 custom-dynamic">
                <div className="static-content">
                  <CalendarComponent />
                </div>
                <div className="dynamic-content">
                  <Routes>
                    <Route path="/map" element={<MapPage />} />
                    <Route path="/generate-dynamic-table" element={<DynamicTable />} />
                    <Route path="/portfolio" element={<PortfolioPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/todos" element={<TodoComponent />} />
                    <Route path="/news" element={<NewsPage />} />
                    <Route path="/videos" element={<VideosPage />} />
                    <Route path="/collections" element={<CollectionsPage />} />
                    <Route path="/" element={<MainPage />} />
                  </Routes>
                </div>
              </div>
              <div className="col-md-2 right-page">
                <RightPage />
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </Router>
    </TodoProvider>
  );
};

export default App;
