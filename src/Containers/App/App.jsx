import React, { useState, useRef, useEffect, useContext } from 'react';
import  classes from './App.module.css';
import Task from '../../Components/Task/Task.jsx';
import axios from '../../axios-firebase'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faMoon, faSun } from '@fortawesome/free-solid-svg-icons'
import {ThemeContext, themes} from '../Context/theme'
import styled from 'styled-components'

  const ToggleTheme = styled.div`
  background: ${props => props.background === 'dark-theme' ? '#20232a' : 'white'}
  `
  const ToggleThemeInput = styled.div`
  background : ${props => props.backgroundTheme === 'dark-theme' ? "#61dafb" : '#9e88e9'}
  `
const IconTheme = styled(FontAwesomeIcon)`
color: ${props => props.iconColor === 'dark-theme' ? '#61dafb !important' : '#9e88e9'}
`
const SpanTheme = styled.span`
  color: ${props => props.spanColor === 'dark-theme' ? '#61dafb !important': '#9e88e9'}
`
function App() {

  const {theme, toggleTheme} = useContext(ThemeContext)

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
    <ToggleTheme background = {theme} style = {{
      position: 'absolute',
      width: '100%',
      height: '100%',
      top: '0',
      left: '0',
      display: 'flex',
      alignItems:'center',
      justifyContent:'center'
    }}>
    <div className = {classes.englober}>
    <div className={classes.App} >
      { <button onClick ={() => toggleTheme()} style = {{background: 'none', position: 'absolute', top: '24px', right: '24px', fontSize: '24px'}} >{theme === 'dark-theme' ?
      <FontAwesomeIcon className={classes.sun} icon = {faSun} />
      :
      <FontAwesomeIcon className={classes.moon} icon = {faMoon} />
      }</button> }
      <header>
        <SpanTheme className= {classes.title} spanColor = {theme}>React To-Do</SpanTheme>
      </header>

      <ToggleThemeInput className={classes.add} backgroundTheme = {theme}>
        <form onSubmit={(e) => submittedTaskHandler(e)}>
          <input
            ref = {targetInput}
            type="text"
            value={input}
            onChange={(e) => changedFormHandler(e)

            }
            placeholder="Ajouter une tâche ?" />
          <button className={classes.iconContainer} type="submit">
            <IconTheme className={classes.arrow} icon = {faArrowRight} iconColor = {theme} />
          </button>
        </form>
      </ToggleThemeInput>

        {tasksDisplayed}
    </div>
    </div>
    </ToggleTheme>
  );
}

export default App;
