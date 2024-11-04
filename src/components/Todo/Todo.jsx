export default function Todo({text,completed,completetodo,onToggle,deletetodo}) {
    return (
        <>
            <li className={completed ? "completed" : ""}>
                <div className="view">
                    <input
                        className="toggle" type="checkbox"
                        checked={completetodo}
                        onChange={onToggle}
                    />
                    <label>{text}</label>
                    <button className="destroy" onClick={deletetodo}></button>
                </div>
            </li>
        </>
    )
}