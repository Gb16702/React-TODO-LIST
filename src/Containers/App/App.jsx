import React, { useState, useRef, useEffect, useContext } from 'react';
import  classes from './App.module.css';
import Task from '../../Components/Task/Task.jsx';
import axios from '../../axios-firebase'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import {ThemeContext, themes} from '../Context/theme'
import styled from 'styled-components'



function App() {

  const {theme, toggleTheme} = useContext(ThemeContext)
  console.log(theme)

  const ToggleTheme = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: ${theme === 'dark-theme' ? themes.dark.background : themes.light.background }
  `


  // States
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');

  const targetInput = useRef('')

  //Quand la page se charge, on récupre l'input grâce à la référence qu'on donne et on utilise la méthode focus
    useEffect(() => {
      targetInput.current.focus()
      axios.get('/tasks.json').then(response => {
        const tasksArray = []
        for(let data in response.data) {
          tasksArray.push({
            ...response.data[data], id: data
          })
        }
        setTasks(tasksArray)
      }).catch(error =>  console.log(`${error}, get`))
    }, [])

  // Fonctions
  const removeClickedHandler = index => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
    axios.delete(`/tasks/${tasks[index].id}.json`)
  }

  const doneClickedHandler = index => {
    const newTasks = [...tasks];
    newTasks[index].done = !tasks[index].done;
    setTasks(newTasks);
    axios.put(`/tasks/${tasks[index].id}.json`, newTasks[index])
  }

  const submittedTaskHandler = (event, index) => {
    event.preventDefault();
    const newTask = {
      content: input,
      done: false,
    }
    console.log(newTask)
    setTasks([...tasks, newTask]);
    setInput('');
    axios.post(`/tasks.json`, newTask).then(response => {
      console.log(response)
    })
  }

  const changedFormHandler = event => {
    setInput(event.target.value);
  }


  // Variables
  let tasksDisplayed = tasks.map((task, index) => (
    <Task

      done={task.done}
      content={task.content}
      key={index}
      removeClicked={() => removeClickedHandler(index)}
      doneClicked={() => doneClickedHandler(index)}
    />

  ));

  return (
    <ToggleTheme>
    <div className = {`${theme}`}>
    <div className={classes.App} >
      { <button onClick ={() => toggleTheme()} ></button> }
      <header>
        <span>React To-DO</span>
      </header>

      <div className={classes.add}>
        <form onSubmit={(e) => submittedTaskHandler(e)}>
          <input
            ref = {targetInput}
            type="text"
            value={input}
            onChange={(e) => changedFormHandler(e)

            }
            placeholder="Ajouter une tâche ?" />
          <button className={classes.iconContainer} type="submit">
            <FontAwesomeIcon className={classes.arrow} icon = {faArrowRight} />
          </button>
        </form>
      </div>

        {tasksDisplayed}
    </div>
    </div>
    </ToggleTheme>
  );
}

export default App;
