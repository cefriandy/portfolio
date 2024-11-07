import { createContext, useState, useContext, useEffect } from 'react';

const TodoContext = createContext();

export const useTodos = () => useContext(TodoContext);

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      const response = await fetch('http://localhost:8090/api/v1/todo/get-all-events?userId=12345678');
      const data = await response.json();
      const allTodos = [...data.data.past, ...data.data.ongoing, ...data.data.upcoming];
      setTodos(allTodos);
      setEvents(allTodos.map(todo => ({
        id: todo.id, // Add id to events
        title: todo.title,
        start: todo.dueDate,
        description: todo.description
      })));
    };

    fetchTodos();
  }, []);

  const addTodo = (newTodo) => {
    setTodos([...todos, newTodo]);
    setEvents([...events, {
      id: newTodo.id, // Add id to new event
      title: newTodo.title,
      start: newTodo.dueDate,
      description: newTodo.description
    }]);
  };

  const deleteTodo = async (id) => {
    try {
      const response = await fetch(`http://localhost:8090/api/v1/todo/delete/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        setTodos(todos.filter(todo => todo.id !== id));
        setEvents(events.filter(event => event.id !== id)); // Ensure events are updated
      } else {
        console.error('Failed to delete todo');
      }
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <TodoContext.Provider value={{ todos, events, addTodo, deleteTodo }}>
      {children}
    </TodoContext.Provider>
  );
};
