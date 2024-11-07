import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

const VideosPage: React.FC = () => {
    const videoData = [
        {
            id: 1,
            title: 'Introduction to React',
            date: '2024-10-01',
            description: 'A beginner-friendly introduction to React, covering the basics of components, state, and props.',
            url: 'https://www.example.com/video1'
        },
        {
            id: 2,
            title: 'Advanced JavaScript Concepts',
            date: '2024-10-15',
            description: 'An in-depth look at advanced JavaScript concepts, including closures, promises, and async/await.',
            url: 'https://www.example.com/video2'
        },
        {
            id: 3,
            title: 'CSS Grid Layout Tutorial',
            date: '2024-11-01',
            description: 'Learn how to create complex layouts easily with CSS Grid, a powerful layout system for the web.',
            url: 'https://www.example.com/video3'
        }
    ];

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Videos Page</h1>
            <div className="row">
                {videoData.map(video => (
                    <div key={video.id} className="col-md-4 mb-4">
                        <div className="card h-100">
                            <div className="card-body">
                                <h5 className="card-title">{video.title}</h5>
                                <h6 className="card-subtitle mb-2 text-muted">{video.date}</h6>
                                <p className="card-text">{video.description}</p>
                                <a href={video.url} className="btn btn-primary" target="_blank" rel="noopener noreferrer">Watch Video</a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default VideosPage;