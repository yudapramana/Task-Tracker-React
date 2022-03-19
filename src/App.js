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
import { UserContext } from './UserContext';

const App = () => {
    
    const [user, setUser] = useState(null)
    const providerUser = useMemo(() => ({ user, setUser }), [user, setUser])

    const [getShowAddTask, setShowAddTask] = useState(false);
    const [editMode, setEditMode] = useState(false);

    const toggleAddTask = () => {
      setShowAddTask(!getShowAddTask);
      // console.log(getShowAddTask);
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
    }

    return (
      <div className="container">
        <UserContext.Provider value={providerUser}>
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
        </UserContext.Provider>
        <Footer />
      </div>
    );
}

export default App;
