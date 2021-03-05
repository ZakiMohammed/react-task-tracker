import { FaTimes } from "react-icons/fa";

function Task({ task, onUpdate, onRemove }) {
    return (
        <div className={`task ${task.reminder ? 'reminder' : ''}`} onDoubleClick={() => onUpdate(task)}>
            <h3>{task.text} <FaTimes style={{ color: 'red' }} onClick={() => onRemove(task.id)}></FaTimes></h3>
            <p>{task.day}</p>
        </div>
    )
}

export default Task
