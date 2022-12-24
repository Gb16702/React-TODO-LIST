import React, { createContext, useEffect, useState } from 'react';

const ThemeContext = createContext()

const themes = {
    dark: {
        background: 'black'
    },
    light: {
        background: 'white'
    }
}

const getTheme = () => {
    const theme  = localStorage.getItem('theme')

    if(!theme) {
        localStorage.setItem('theme', 'dark-theme')
        return theme
    }else{
        return theme
    }
}

const ThemeProvider =({children}) => {
    const [theme, setTheme] = useState(getTheme)

    function toggleTheme() {
        if(theme === 'dark-theme') {
            setTheme('light-theme')
        }else{
            setTheme('dark-theme')
        }
    }
    useEffect(() => {
        const refreshTheme = () => {
            localStorage.setItem('theme', theme)
        }
        refreshTheme()
    }, [theme])

    return (
    <ThemeContext.Provider value = {{theme, setTheme, toggleTheme}}>
        {children}
    </ThemeContext.Provider>
    )
}

export {ThemeContext, ThemeProvider, themes}
