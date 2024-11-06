export default function Header({todoItem,setTodoItem,addTodo}) {

    const handleInputChange  = (e) => {
        setTodoItem(e.target.value);  
      };

    const handleAdd  = (e) => {
        e.preventDefault();
        addTodo();
        setTodoItem('');
    }


    return (
        <>
        <header className="header">
            <h1>todos</h1>
            <form >
                <input 
                    className="new-todo" 
                    placeholder="What needs to be done?" autoFocus 
                    value={todoItem}
                    onChange={handleInputChange} 
                    />
                <button className='add-btn' type="submit" onClick={handleAdd }>Add</button>
            </form>
	    </header>
        </>
    )
}