import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

const CollectionsPage: React.FC = () => {
    const notes = [
        { id: 1, title: 'Meeting Notes', content: 'Discuss project milestones and deadlines.' },
        { id: 2, title: 'Shopping List', content: 'Milk, Bread, Eggs, Butter.' },
        { id: 3, title: 'Ideas', content: 'Explore new features for the app.' }
    ];

    const achievements = [
        { id: 1, title: 'Completed React Course', date: '2024-10-01' },
        { id: 2, title: 'Won Hackathon', date: '2024-09-15' },
        { id: 3, title: 'Published Blog Post', date: '2024-08-20' }
    ];

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Collections Page</h1>
            <div className="row">
                <div className="col-md-6 mb-4">
                    <div className="card h-100">
                        <div className="card-body">
                            <h5 className="card-title">Notes</h5>
                            {notes.map(note => (
                                <div key={note.id} className="mb-3">
                                    <h6 className="card-subtitle mb-2 text-muted">{note.title}</h6>
                                    <p className="card-text">{note.content}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="col-md-6 mb-4">
                    <div className="card h-100">
                        <div className="card-body">
                            <h5 className="card-title">Achievements</h5>
                            {achievements.map(achievement => (
                                <div key={achievement.id} className="mb-3">
                                    <h6 className="card-subtitle mb-2 text-muted">{achievement.title}</h6>
                                    <p className="card-text">{achievement.date}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CollectionsPage;
