import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import DynamicTable from '../dynamic-table/DynamicTable';

const portfolioItems = [
    {
        id: 1,
        title: 'Project One',
        description: 'This is a description for project one.',
        imageUrl: 'https://via.placeholder.com/150',
        pageName: "DynamicTable"
    },
    {
        id: 2,
        title: 'Project Two',
        description: 'This is a description for project two.',
        imageUrl: 'https://via.placeholder.com/150',
        pageName: "PortfoliDua"
    },
    {
        id: 3,
        title: 'Project Three',
        description: 'This is a description for project three.',
        imageUrl: 'https://via.placeholder.com/150',
        pageName: "PortfoliDua"
    }
];

// Portfolio item card component
const PortfolioCard: React.FC<{ item: typeof portfolioItems[0], onClick: () => void }> = ({ item, onClick }) => {
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


const PortfolioDetail: React.FC<{ item: typeof portfolioItems[0], onBack: () => void }> = ({ item, onBack }) => {
    const [showDemo, setShowDemo] = useState(false);

    const renderDemoComponent = () => {
        switch (item.pageName) {
            case 'DynamicTable':
                return <DynamicTable />;
            default:
                return <div>Component not found</div>;
        }
    };

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center">
                <h3 className="text-center w-100">{item.title}</h3> {/* Changed h1 to h3 */}
                <button className="btn btn-secondary btn-sm" onClick={onBack}> {/* Added btn-sm class */}
                    <i className="bi bi-arrow-left"></i> Back
                </button>
            </div>
            <img src={item.imageUrl} alt={item.title} style={{ width: '100%', height: '100px' }} />
            <p>{item.description}</p>
            <button className="btn btn-primary" onClick={() => setShowDemo(true)}>Demo</button>
            {showDemo && renderDemoComponent()}
        </div>
    );
};

const PortfolioPage: React.FC = () => {
    const [selectedItem, setSelectedItem] = useState<typeof portfolioItems[0] | null>(null);

    return (
        <div className="container position-relative">
            <h1 className="my-4">Portfolio Page</h1>
            <div className="row">
                {selectedItem ? (
                    <div className="col-md-12">
                        <PortfolioDetail item={selectedItem} onBack={() => setSelectedItem(null)} />
                    </div>
                ) : (
                    portfolioItems.map(item => (
                        <div className="col-md-4 mb-4" key={item.id}>
                            <PortfolioCard item={item} onClick={() => setSelectedItem(item)} />
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default PortfolioPage;
