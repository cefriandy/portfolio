import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { useTodos } from '../../contexts/TodoContext';
import './style.css'

const TodoComponent: React.FC = () => {
    const { todos, addTodo, deleteTodo } = useTodos();
    const [newTodo, setNewTodo] = useState({ userId: '12345678', title: '', description: '', dueDate: '', completed: false });
    const [loading, setLoading] = useState(false);
    const [notification, setNotification] = useState('');
    const apiHost = import.meta.env.VITE_API_HOST;


    const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;
        setNewTodo({ ...newTodo, [name]: value });
    };

    const handleCreateTodo = async () => {
        setLoading(true);
        const response = await fetch(`${apiHost}/api/v1/todo/create-todo`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newTodo)
        });
        const createdTodo = await response.json();
        addTodo(createdTodo);
        setNewTodo({ userId: '12345678', title: '', description: '', dueDate: '', completed: false });
        setLoading(false);
        setNotification('Todo saved successfully!');
        setTimeout(() => setNotification(''), 3000);

        const dismissButton = document.querySelector('[data-bs-dismiss="modal"]') as HTMLElement | null;
        if (dismissButton) {
            dismissButton.click();
        }
    };

    return (
        <div className="container mt-5">
            <h1>Todo Page</h1>
            {notification && <div className="alert alert-success">{notification}</div>}
            <button className="btn btn-primary mb-3" data-bs-toggle="modal" data-bs-target="#createTodoModal">Create Todo</button>
            {loading ? (
                <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '200px' }}>
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : (
                <div className="table-responsive">
                    <table className="custom-table">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Due Date</th>
                                <th>Completed</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {todos.map(todo => (
                                <tr key={todo.id}>
                                    <td>{todo.title}</td>
                                    <td>{todo.description}</td>
                                    <td>{todo.dueDate}</td>
                                    <td>{todo.completed ? 'Yes' : 'No'}</td>
                                    <td>
                                        <button className="btn btn-warning btn-sm me-2">Edit</button>
                                        <button className="btn btn-danger btn-sm" onClick={() => deleteTodo(todo.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Create Todo Modal */}
            <div className="modal fade" id="createTodoModal" tabIndex={-1} aria-labelledby="createTodoModalLabel" aria-hidden="true">                <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="createTodoModalLabel">Create Todo</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="mb-3">
                            <label className="form-label">Title</label>
                            <input type="text" className="form-control" name="title" value={newTodo.title} onChange={handleInputChange} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Description</label>
                            <textarea className="form-control" name="description" value={newTodo.description} onChange={handleInputChange}></textarea>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Due Date</label>
                            <input type="datetime-local" className="form-control" name="dueDate" value={newTodo.dueDate} onChange={handleInputChange} />
                        </div>
                        <div className="mb-3 form-check">
                            <input type="checkbox" className="form-check-input" name="completed" checked={newTodo.completed} onChange={(e) => setNewTodo({ ...newTodo, completed: e.target.checked })} />
                            <label className="form-check-label">Completed</label>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary" onClick={handleCreateTodo} disabled={loading}>
                            {loading ? 'Saving...' : 'Save'}
                        </button>
                    </div>
                </div>
            </div>
            </div>
        </div>
    );
};

export default TodoComponent;