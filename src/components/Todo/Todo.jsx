export default function Todo({text,completed,onToggle,deletetodo}) {
    return (
        <>
            <li className={completed ? "completed" : ""}>
                <div className="view">
                    <input
                        className="toggle" type="checkbox"
                        checked={completed}
                        onChange={onToggle}
                    />
                    <label>{text}</label>
                    <button className="destroy" onClick={deletetodo}></button>
                </div>
            </li>
        </>
    )
}