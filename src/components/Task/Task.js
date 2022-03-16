import './Task.css';

const Task = (props) => {

    const triggerCompleted = (id) => {
        props.completeTask(id);
    }

    const triggerRemove = (id) => {
        props.deleteTask(props.task.id);
    }

    const triggerEdit = (task) => {
        console.log('task on Task');
        console.log(task);
        props.editTask(task);
    }

    const handleClick = (e) => {
        switch (e.detail) {
            case 1:
                // console.log("click");
                break;
            case 2:
                // console.log("double click");
                props.switchReminder(props.task.id)
                break;
        
            default:
                break;
        }
    }



    return (

    <div onClick={handleClick} key={props.task.id} className={`task ${props.task.reminder ? 'reminder' : ''}`} >
        <h3>
            {
                !props.task.completed ? props.task.text : <strong className='text-breakthrough'>{ props.task.text }</strong>
            }

            {!props.task.completed ? 
            <div className="btn-action">
                <i className="action fas fa-check-circle green" onClick={triggerCompleted.bind(this, props.task.id)}></i>
                <i className="action fas fa-pencil-square" onClick={triggerEdit.bind(this, props.task)}></i>
                <i className="action fas fa-times red" onClick={triggerRemove}></i>
            </div> : 
            <div className="btn-action">
                <i className="action fas fa-minus-circle grey" onClick={triggerCompleted.bind(this, props.task.id)}></i>
            </div>
            }
        </h3>
        <p>
            {
            !props.task.completed ? props.task.day : <strong className='text-breakthrough'>{ props.task.day }</strong>
            }
        </p>
        
    </div>
    );

    
}

export default Task