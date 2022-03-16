import './App.css'

import { useState } from 'react';
import React from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './views/Home/Home';
import About from './views/About/About';
import { 
  Routes,
  Route
 } from "react-router-dom";

const App = () => {

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

      // console.log('editMode')
      // console.log(editMode)
    }

    const eventEditMode = (editMode) => {
      setEditMode(editMode);
    }

    return (
      <div className="container">
        <Header 
          title="Task Tracker R"  
          buttonAddOnClick={toggleAddTask}
          showAddTask={getShowAddTask}
          editMode={editMode}
        />
        <Routes>
          <Route path="/" element={<Home getShowAddTask={getShowAddTask} changeBtnBehavior={handleBtnBehavior} eventHideForm={toggleAddTask} setEditMode={eventEditMode} />} />
          <Route path="about" element={<About />} />
        </Routes>
        <Footer />
      </div>
    );
}

export default App;
