import { useState, useEffect } from "react";
import Todo from "../Todo";
import Header from "../Header";
import Footer from "../Footer";

export default function TodoList() {
    const [todoItem, setTodoItem] = useState('');
    const [todoList, setTodoList] = useState([]);
    const [filter, setFilter] = useState('all');
    const [allCompleted, setAllCompleted] = useState(false); 

    // useEffect hook to load the todo list from localStorage when the component mounts
    useEffect(() => {
        const savedTodos = JSON.parse(localStorage.getItem("todoList")) || [];
        setTodoList(savedTodos);
    }, []);

    // useEffect hook to update the `allCompleted` state whenever the todo list changes
    useEffect(() => {
        setAllCompleted(todoList.length > 0 && todoList.every(todo => todo.completed));
    }, [todoList]);

     // Function to add a new todo to the list
    const addTodo = () => {
        if (todoItem.trim()) {
            const newTodoList = [...todoList, { text: todoItem, completed: false }];
            setTodoList(newTodoList);
            localStorage.setItem("todoList", JSON.stringify(newTodoList));
            setTodoItem('');
        }
    };

    // Function to delete a specific todo by its index
    const deleteTodo = (index) => {
        const newTodoList = todoList.filter((_, i) => i !== index);
        setTodoList(newTodoList);
        localStorage.setItem("todoList", JSON.stringify(newTodoList));
    };

     // Function to toggle the completion status of a specific todo
    const completeTodo = (index) => {
        const newTodoList = [...todoList];
        newTodoList[index].completed = !newTodoList[index].completed; 
        setTodoList(newTodoList);
        localStorage.setItem("todoList", JSON.stringify(newTodoList));
    };

     // Function to toggle all todos' completion status at once
    const toggleCompleteAll = () => {
        const newTodoList = todoList.map(todo => ({
            ...todo,
            completed: !allCompleted  
        }));
        setTodoList(newTodoList);
        setAllCompleted(!allCompleted); 
        localStorage.setItem("todoList", JSON.stringify(newTodoList));
    };

    // Function to clear all completed todos from the list
    const clearCompleted = () => {
        const newTodoList = todoList.filter(todo => !todo.completed);  
        setTodoList(newTodoList);
        localStorage.setItem("todoList", JSON.stringify(newTodoList));  
    };

    // Function to filter the todo list based on the selected filter ('all', 'active', 'completed')
    const setFilterTodo= todoList.filter(todo => {
        if (filter === 'active') return !todo.completed;
        if (filter === 'completed') return todo.completed;
        return true; 
    });

    return (
        <>
            <Header
                todoItem={todoItem}
                setTodoItem={setTodoItem}
                addTodo={addTodo}
            />
            <section className="main">
                <input 
                    className="toggle-all" 
                    type="checkbox" 
                    checked={allCompleted}
                    onChange={toggleCompleteAll}  // When clicked, it triggers `toggleCompleteAll`
                />
                <label htmlFor="toggle-all">
                    Mark all as complete
                </label>

                <ul className="todo-list">
                    {
                        setFilterTodo.map((item, index) => (
                            <Todo
                                key={index}
                                text={item.text}
                                completed={item.completed}
                                onToggle={() => completeTodo(index)} // Toggle completion of a specific todo
                                deletetodo={() => deleteTodo(index)} // Delete a specific todo
                            />
                        ))
                    }
                </ul>
                <Footer 
                    todoList={todoList} 
                    clearCompleted={clearCompleted} 
                    setFilter={setFilter}
                />
            </section>
        </>
    );
}
