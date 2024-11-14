import React, { useState } from 'react';
import DynamicTable from '../dynamic-table/DynamicTable';

const PortfolioDetail: React.FC<{ item: any; onBack: () => void }> = ({ item, onBack }) => {
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
                <h3 className="text-center w-100">{item.title}</h3>
                <button className="btn btn-secondary btn-sm" onClick={onBack}>
                    <i className="bi bi-arrow-left"></i> Back
                </button>
            </div>
            <img
                src={item.imageUrl}
                alt={item.title}
                style={{ width: '100%', height: 'auto', maxHeight: '200px', objectFit: 'cover' }}
            />
            <p>{item.description}</p>
            <button className="btn btn-primary" onClick={() => setShowDemo(true)}>Demo</button>
            {showDemo && renderDemoComponent()}
        </div>
    );
};

export default PortfolioDetail;
