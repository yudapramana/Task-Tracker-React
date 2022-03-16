import './Home.css'
import { useState, useEffect } from 'react';
import Tasks from '../../components/Tasks/Tasks';
import AddTask from '../../components/AddTask/AddTask';
import { getItem, getItems, setItem, deleteItem, updateItem } from '../../services/list';


const Home = (props) => {

    const [getTasks, setTasks] = useState([]);
    const [edit, setEdit] = useState({
        id: null,
        text: '',
        day: '',
        reminder: false
    });

    useEffect(() => {

        let mounted = true;
        getItems().then(res => {
            if (mounted) {
                // console.log('res');
                // console.log(res);
                setTasks(res);
            }
        })

        return () => {
            mounted = false;
        }
    }, [])

    const eventCreateTask = (task) => {

        setItem(task).then(res => {
            setTasks(getTasks.concat(res));
        })

        // console.log(task);
    }

    const eventDeleteTask = (id) => {
        deleteItem(id).then(res => {
            setTasks(getTasks.filter(item => item.id !== id));
        });
    }

    const eventUpdateTask = (task) => {
        // console.log('eventUpdateTask');
        updateItem(task.id, task).then(res => {
            setTasks(getTasks.map(item => item.id === task.id ? task : item));
        });
        triggerHideForm();
    }

    const eventEditTask = (task) => {
        console.log('task on Home');
        console.log(task);
        setEdit(task);
        props.changeBtnBehavior(task);
        // console.log(edit);
    }

    const eventToggleReminder = (id) => {
        // console.log(id);
        getItem(id).then(res => {
            // console.log(res);
            const updTask = { ...res, reminder: !res.reminder };

            updateItem(id, updTask).then(res => {
                setTasks(getTasks.map(item => item.id === id ? updTask : item));
            })
        })
    }

    const eventCompleteTask = (id) => {
        getItem(id).then(res => {
            // console.log(res);
            const updTask = { ...res, completed: !res.completed };

            updateItem(id, updTask).then(res => {
                
                setTasks(
                    getTasks
                    .map(item => item.id === id ? updTask : item)
                    // .sort((a, b) => a.completed > b.completed ? 1 : -1)
                    // .sort((a, b) => (!a.completed === !b.completed && a.id < b.id) ? 1 : -1)
                    );
            })
        })
    }

    const triggerHideForm = () => {
        setEdit({
            id: null,
            text: '',
            day: '',
            reminder: false
        });
        props.eventHideForm();
        props.setEditMode(false);
    }

    return (
        <div>
            {props.getShowAddTask ? <AddTask onCreateTask={eventCreateTask} onUpdateTask={eventUpdateTask} task={edit} eventHideForm={triggerHideForm} /> : null}
            <Tasks tasks={getTasks} deleteTask={eventDeleteTask} editTask={eventEditTask} completeTask={eventCompleteTask} switchReminder={eventToggleReminder} />
        </div>
    );

}


export default Home