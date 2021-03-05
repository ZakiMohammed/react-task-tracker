import Task from './Task'

function Tasks({ tasks, onUpdate, onRemove }) {
    return (
        <>
            {tasks.map(task => (
                <Task
                    key={task.id} 
                    task={task} 
                    onUpdate={onUpdate}
                    onRemove={onRemove} ></Task>
            ))}
        </>
    )
}

export default Tasks
