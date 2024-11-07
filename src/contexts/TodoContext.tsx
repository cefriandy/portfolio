import { createContext, useState, useContext, useEffect } from 'react';

interface Todo {
  id: string;
  title: string;
  dueDate: string;
  description: string;
  completed: boolean;
}

interface Event {
  id: string;
  title: string;
  dueDate: string; 
  description: string;
  completed: boolean
}

interface TodoContextType {
  todos: Todo[];
  events: Event[];
  addTodo: (newTodo: Todo) => void;
  deleteTodo: (id: string) => Promise<void>;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const useTodos = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodos must be used within a TodoProvider');
  }
  return context;
};

export const TodoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [events, setEvents] = useState<Event[]>([]); // Correct type here

  useEffect(() => {
    const fetchTodos = async () => {
      const response = await fetch('http://localhost:8090/api/v1/todo/get-all-events?userId=12345678');
      const data = await response.json();
      const allTodos: Todo[] = [...data.data.past, ...data.data.ongoing, ...data.data.upcoming];
      setTodos(allTodos);
      setEvents(allTodos.map(todo => ({
        id: todo.id,
        title: todo.title,
        dueDate: todo.dueDate,
        description: todo.description,
        completed: todo.completed
      })));
    };

    fetchTodos();
  }, []);

  const addTodo = (newTodo: Todo) => {
    setTodos(prevTodos => [...prevTodos, newTodo]);
    setEvents(prevEvents => [...prevEvents, {
      id: newTodo.id,
      title: newTodo.title,
      dueDate: newTodo.dueDate,
      description: newTodo.description,
      completed: newTodo.completed
    }]);
  };

  const deleteTodo = async (id: string) => {
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