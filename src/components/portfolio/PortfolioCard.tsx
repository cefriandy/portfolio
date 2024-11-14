import React from 'react';

const PortfolioCard: React.FC<{ item: any; onClick: () => void }> = ({ item, onClick }) => {
    return (
        <div className="card mb-4" onClick={onClick} style={{ maxWidth: '100%' }}>
            <img src={item.imageUrl} className="card-img-top img-fluid" alt={item.title} />
            <div className="card-body">
                <h5 className="card-title">{item.title}</h5>
                <p className="card-text">{item.description}</p>
            </div>
        </div>
    );
};

export default PortfolioCard;