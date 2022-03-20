import './Home.css'
import { useState, useEffect, useContext } from 'react';
import Tasks from '../../components/Tasks/Tasks';
import AddTask from '../../components/AddTask/AddTask';
import { getItem, getItems, setItem, deleteItem, updateItem, login, register } from '../../services/list';
import { UserContext } from '../../contexts/UserContext';
import { TasksContext } from '../../contexts/TasksContext';
import Auth from '../../components/Auth/Auth';


const Home = (props) => {

    const { user, setUser } = useContext(UserContext);
    const { tasks, setTasks } = useContext(TasksContext);
    const [isRegister, setIsRegister] = useState(false);

    const [edit, setEdit] = useState({
        id: null,
        text: '',
        day: '',
        reminder: false
    });

    useEffect(() => {

        let mounted = true;

        let userData = localStorage.getItem('user');
        if (userData) {
            getItems().then(res => {
                if (mounted) {
                    setTasks(res);
                }
            })
            if (mounted) {
                setUser(JSON.parse(userData));
            }
        }


        return () => {
            mounted = false;
        }
    }, [setUser, setTasks])

    const eventCreateTask = (task) => {

        setItem(task).then(res => {
            setTasks(tasks.concat(res));
        })
    }

    const eventDeleteTask = (id) => {
        deleteItem(id).then(res => {
            setTasks(tasks.filter(item => item.id !== id));
        });
    }

    const eventUpdateTask = (task) => {
        // console.log('eventUpdateTask');
        updateItem(task.id, task).then(res => {
            setTasks(tasks.map(item => item.id === task.id ? task : item));
        });
        triggerHideForm();
    }

    const eventEditTask = (task) => {
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
                setTasks(tasks.map(item => item.id === id ? updTask : item));
            })
        })
    }

    const eventCompleteTask = (id) => {
        getItem(id).then(res => {
            // console.log(res);
            const updTask = { ...res, completed: !res.completed };

            updateItem(id, updTask).then(res => {

                setTasks(
                    tasks
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

    const eventLogin = (userData) => {
        login(userData).then(res => {

            if (res.message) {
                alert(res.message);
            } else {
                setUser(res);
                localStorage.setItem("user", JSON.stringify(res));
                localStorage.setItem("token", res.token);
                getItems().then(res => {
                    setTasks(res);
                })
            }

        });
    }

    const eventRegister = (userData) => {
        register(userData).then(res => {
            console.log(res);
            if (res.message) {
                alert(res.message);
            } else {
                console.log('success register');
                eventToggleAuth();
            }

        });
    }

    const eventToggleAuth = () => {
        setIsRegister(!isRegister);
    }

    return (
        <div>

            {
                !user ?
                    <Auth triggerLogin={eventLogin} triggerRegister={eventRegister} isRegister={isRegister} toggleAuth={eventToggleAuth}/> : ''
            }

            {(user && props.getShowAddTask) ? <AddTask onCreateTask={eventCreateTask} onUpdateTask={eventUpdateTask} task={edit} eventHideForm={triggerHideForm} /> : null}
            {
                user ? (
                    <Tasks tasks={tasks} deleteTask={eventDeleteTask} editTask={eventEditTask} completeTask={eventCompleteTask} switchReminder={eventToggleReminder} />
                ) : (
                    null
                )
            }
        </div>
    );

}


export default Home