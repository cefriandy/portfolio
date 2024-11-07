import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

const NewsPage: React.FC = () => {
    const newsData = [
        {
            id: 1,
            title: 'Breaking News: Market Hits Record Highs',
            date: '2024-11-01',
            description: 'The stock market reached new record highs today, driven by strong earnings reports and positive economic data.'
        },
        {
            id: 2,
            title: 'Local News: New Park Opens Downtown',
            date: '2024-11-02',
            description: 'A new park has opened in the downtown area, providing a green space for residents to enjoy outdoor activities.'
        },
        {
            id: 3,
            title: 'Tech News: New Smartphone Released',
            date: '2024-11-03',
            description: 'The latest smartphone model has been released, featuring cutting-edge technology and innovative features.'
        }
    ];

    return (
        <div className="container mt-5">
            <h1 className="mb-4">News Page</h1>
            <div className="row">
                {newsData.map(news => (
                    <div key={news.id} className="col-md-4 mb-4">
                        <div className="card h-100">
                            <div className="card-body">
                                <h5 className="card-title">{news.title}</h5>
                                <h6 className="card-subtitle mb-2 text-muted">{news.date}</h6>
                                <p className="card-text">{news.description}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NewsPage;