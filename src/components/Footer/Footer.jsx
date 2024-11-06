export default function Footer({todoList,clearCompleted,setFilter }) {

    const remainingCount = todoList.filter(todo => !todo.completed).length; 

    return (
        <>
        <footer className="footer">
            <span className="todo-count">
                <strong>{remainingCount}</strong> items left
            </span>

            <ul className="filters">
                <li>
                    <a href="#/" onClick={() => setFilter('all')} className="selected">All</a>
                </li>
                <li>
                    <a href="#/" onClick={() => setFilter('active')} >Active</a>
                </li>
                <li>
                    <a href="#/" onClick={() => setFilter('completed')}>Completed</a>
                </li>
            </ul>

            <button className="clear-completed" onClick={clearCompleted}>
                Clear completed
            </button>
	    </footer>
        </>
    )
}