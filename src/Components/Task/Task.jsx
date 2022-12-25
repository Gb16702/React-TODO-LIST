import React, {useContext} from 'react';
import classes from './Task.module.css';
import {ThemeContext, themes} from "../../Containers/Context/theme.jsx"
import styled from 'styled-components'

const ItemTask = styled.div`
background: ${props => props.backgroundTheme === 'dark-theme' ? '#61dafb !important' : '#9e88e9 !important'};
color: ${props => props.backgroundTheme === 'dark-theme' ? '#333 !important' : '#fff !important'};
&:hover {
}
`

const ItemTask2 = styled.div`
&:hover {
    background: ${props => props.backgroundTheme === 'dark-theme' ? '#61dafb !important' : '#9e88e9 !important'};
}
`

function Task(props) {
    const {theme, toggleTheme} = useContext(ThemeContext)

    console.log(theme)



    return (
        <>
            {props.done ?
            <ItemTask className={classes.task} backgroundTheme = {theme} style = {{
            color: '#fff',
            background: 'red'
        }}
            >
                <div className={classes.content} onClick={props.doneClicked}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                        <path d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.235.235 0 0 1 .02-.022z"/>
                    </svg>
                    <strike>
                        {props.content}
                    </strike>
                </div>
            <svg onClick={props.removeClicked} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
            </svg>
        </ItemTask>
        :
        <ItemTask2 backgroundTheme = {theme} className={classes.task}>
                <div className={classes.content}  onClick={props.doneClicked} >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                    </svg>
                    {props.content}
                </div>
            <svg onClick={props.removeClicked} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
            </svg>
        </ItemTask2>

    }
    </>
    );
}

export default Task;