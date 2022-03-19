import './Tasks.css';
import Task from '../Task/Task.js';

const Tasks = (props) => {

    const handleComplete = (id) => {
        props.completeTask(id);
    }

    const handleRemove = (id) => {
        props.deleteTask(id);
    }

    const handleSwitch = (id) => {
        props.switchReminder(id);
    }

    const handleEdit = (task) => {
        console.log('task on Tasks');
        console.log(task);
        props.editTask(task);
    }

    return (
        <div className="tasks">
            {
                props.tasks.length > 0 ?
                (
                    props.tasks
                    .sort((a, b) => a.completed > b.completed ? 1 : -1)
                    .map(task => {
                        return (
                            <Task key={task.id} task={task} deleteTask={handleRemove} completeTask={handleComplete} editTask={handleEdit} switchReminder={handleSwitch}/>
                        );
                    })
                ) : <h2 className='no-task'>No Task Available, Create One!</h2>
            }
        </div>
    );
}

export default Tasks