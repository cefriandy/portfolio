import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import PortfolioDetail from './PortfolioDetail';
import image3 from '../../assets/image3.png';
import PortfolioCard from './PortfolioCard';

const portfolioItems = [
    {
        id: 1,
        title: 'Project One',
        description: 'This is a description for project one.',
        imageUrl: `${image3}`,
        pageName: "DynamicTable"
    },
    {
        id: 2,
        title: 'Project Two',
        description: 'This is a description for project two.',
        imageUrl: `${image3}`,
        pageName: "PortfoliDua"
    },
    {
        id: 3,
        title: 'Project Three',
        description: 'This is a description for project three.',
        imageUrl: `${image3}`,
        pageName: "PortfoliDua"
    }
];

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
