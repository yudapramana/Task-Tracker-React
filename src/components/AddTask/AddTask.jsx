import './AddTask.css';
import { useEffect, useState } from 'react';


const AddTask = (props) => {

    const [getText, setText] = useState('');
    const [getDate, setDate] = useState('');
    const [getReminder, setReminder] = useState('');

    const handleAfterSubmit = () => {
        setText('');
        setDate('');
        setReminder(false);
    }

    useEffect(() => {
        let data = props.task;
        if(props.task){
            setText(data.text);
            setDate(data.day);
            setReminder(data.reminder);
        } else {
            handleAfterSubmit();
        }
    }, [props.task])

    const handleSubmit = (event) => {
        event.preventDefault();

        if(props.task.id){
            setText(props.task.text)
            setDate(props.task.day)
            setReminder(props.task.reminder)
        }

        if (!getText || !getDate) {
            alert('Please fill in all fields');
            return;
        }

        const aTask = {
            id: !props.task.id ? ( Math.floor(Math.random() * 100) + 1 ) : props.task.id,
            text: getText,
            day: getDate,
            reminder: getReminder
        }

        if(!props.task.id) {
            props.onCreateTask(aTask);
        }
        else {
            props.onUpdateTask(aTask);
        }

        handleAfterSubmit();
        
    }

    const triggerHideForm = () => {
        props.eventHideForm();
        handleAfterSubmit();
    }

    return (
        <form onSubmit={handleSubmit} className="add-form">
            <div className="form-control">
                <label>Task</label>
                <input type="text" name="text" placeholder="Add Task" value={getText} onChange={e => setText(e.target.value)} />
            </div>
            <div className="form-control">
                <label>Day & Time</label>
                <input
                    type="text"
                    name="date"
                    placeholder="Add Day & Time"
                    value={getDate}
                    onChange={e => setDate(e.target.value)}
                />
            </div>
            <div className="form-control form-control-check">
                <label>Set Reminder</label>
                <input type="checkbox" name="reminder" checked={getReminder} onChange={e => setReminder(e.target.checked)} />
            </div>

            {
                !props.task.id ?
                    <input type="submit" value='Save Task' className="btn btn-block" /> :
                    <div className="btn-wrapper">
                        <input type="submit" value={props.task.id ? 'Update' : 'Save Task'} className="btn btn-block" />
                        <button type="button" className="btn btn-block" onClick={triggerHideForm}>Cancel</button>
                    </div>
            }

        </form>
    );
}


export default AddTask