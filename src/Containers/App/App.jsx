import React, { useState, useRef, useEffect } from 'react';
import classes from './App.module.css';
import Task from '../../Components/Task/Task.jsx';
import axios from '../../axios-firebase'

function App() {

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
    <div className={classes.App}>
      <header>
        <span>TO-DO</span>
      </header>

      <div className={classes.add}>
        <form onSubmit={(e) => submittedTaskHandler(e)}>
          <input
            ref = {targetInput}
            type="text"
            value={input}
            onChange={(e) => changedFormHandler(e)

            }
            placeholder="Que souhaitez-vous ajouter ?" />
          <button type="submit">
            Ajouter
          </button>
        </form>
      </div>
      <div className='TaskContainer' >

        {tasksDisplayed.done ? classes.red : tasksDisplayed }


      </div>
    </div>
  );
}

export default App;
