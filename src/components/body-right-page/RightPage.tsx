import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useTodos } from '../../contexts/TodoContext';

const RightPage: React.FC = () => {
  const { todos } = useTodos();

  const pastEvents = todos.filter(todo => new Date(todo.dueDate) < new Date());
  const ongoingTasks = todos.filter(todo => new Date(todo.dueDate) >= new Date() && !todo.completed);
  const upcomingEvents = todos.filter(todo => new Date(todo.dueDate) >= new Date() && todo.completed);

  return (
    <div className="container p-3 shadow border">
      <h4 className="mb-3">To-Do List</h4>
      <div className="mb-3">
        <h5>Past Tasks</h5>
        <ul className="list-group">
          {pastEvents.map((task, index) => (
            <li key={index} className="list-group-item">
              <strong>{task.title}</strong><br />
              <small className="text-muted">{task.description}</small>
            </li>
          ))}
        </ul>
      </div>
      <div className="mb-3">
        <h5>Ongoing Tasks</h5>
        <ul className="list-group">
          {ongoingTasks.map((task, index) => (
            <li key={index} className="list-group-item">
              <strong>{task.title}</strong><br />
              <small className="text-muted">{task.description}</small>
            </li>
          ))}
        </ul>
      </div>
      <div className="mb-3">
        <h5>Upcoming Events</h5>
        <ul className="list-group">
          {upcomingEvents.map((event, index) => (
            <li key={index} className="list-group-item">
              <strong>{event.title}</strong><br />
              <small className="text-muted">{event.description}</small>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RightPage;