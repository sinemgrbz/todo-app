import { useState, useEffect } from "react";
import Todo from "../Todo";
import Header from "../Header";
import Footer from "../Footer";

export default function TodoList() {
    const [todoItem, setTodoItem] = useState('');
    const [todoList, setTodoList] = useState([]);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        const savedTodos = JSON.parse(localStorage.getItem("todoList")) || [];
        setTodoList(savedTodos);
    }, []);

    const addTodo = () => {
        if (todoItem.trim()) {
            const newTodoList = [...todoList, { text: todoItem, completed: false }];
            setTodoList(newTodoList);
            localStorage.setItem("todoList", JSON.stringify(newTodoList));
            setTodoItem('');
        }
    };

    const deleteTodo = (index) => {
        const newTodoList = todoList.filter((_, i) => i !== index);
        setTodoList(newTodoList);
        localStorage.setItem("todoList", JSON.stringify(newTodoList));
    };

    const completeTodo = (index) => {
        const newTodoList = [...todoList];
        newTodoList[index].completed = !newTodoList[index].completed;  // Toggle completion
        setTodoList(newTodoList);
        localStorage.setItem("todoList", JSON.stringify(newTodoList));
    };

    const clearCompleted = () => {
        const newTodoList = todoList.filter(todo => !todo.completed);  // Sadece tamamlanmamış olanları bırak
        setTodoList(newTodoList);
        localStorage.setItem("todoList", JSON.stringify(newTodoList));  // Güncellenmiş listeyi yerel depolamaya kaydet
    };

    const setFilterTodo= todoList.filter(todo => {
        if (filter === 'active') return !todo.completed;
        if (filter === 'completed') return todo.completed;
        return true;  // 'all' durumu
    });

    return (
        <>
            <Header
                todoItem={todoItem}
                setTodoItem={setTodoItem}
                addTodo={addTodo}
            />
            <section className="main">
                <input className="toggle-all" type="checkbox" />
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
                                onToggle={() => completeTodo(index)}
                                deletetodo={() => deleteTodo(index)}
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
