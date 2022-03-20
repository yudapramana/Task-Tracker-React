import './App.css'

import { useMemo, useState } from 'react';
import React from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './views/Home/Home';
import About from './views/About/About';
import { 
  Routes,
  Route
 } from "react-router-dom";
import { UserContext } from './contexts/UserContext';
import { TasksContext } from './contexts/TasksContext';

const App = () => {
    
    const [user, setUser] = useState(null)
    const providerUser = useMemo(() => ({ user, setUser }), [user, setUser])

    const [tasks, setTasks] = useState([])
    const providerTasks = useMemo(() => ({ tasks, setTasks }), [tasks, setTasks])

    const [getShowAddTask, setShowAddTask] = useState(false);
    const [editMode, setEditMode] = useState(false);

    const toggleAddTask = () => {
      setShowAddTask(!getShowAddTask);
    } 

    const handleBtnBehavior = (task) => {
      if(task.id){
        setShowAddTask(true);
        setEditMode(true);
      } else {
        setShowAddTask(false);
        setEditMode(false);
      }
    }

    const eventEditMode = (editMode) => {
      setEditMode(editMode);
    }

    const eventLogout = () => {
      setUser(null)
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      setTasks([]);
    }

    return (
      <div className="container">
        <UserContext.Provider value={providerUser}>
          <TasksContext.Provider value={providerTasks}>
            <Header 
              title="Task Tracker"  
              buttonAddOnClick={toggleAddTask}
              showAddTask={getShowAddTask}
              editMode={editMode}
              triggerLogout={eventLogout}
            />
          
            <Routes>
              <Route path="/" element={<Home getShowAddTask={getShowAddTask} changeBtnBehavior={handleBtnBehavior} eventHideForm={toggleAddTask} setEditMode={eventEditMode} />} />
              <Route path="about" element={<About />} />
            </Routes>
          </TasksContext.Provider>
        </UserContext.Provider>
        <Footer />
      </div>
    );
}

export default App;
