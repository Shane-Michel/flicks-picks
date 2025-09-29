import { useState, createContext, useEffect } from "react";
// use hook to create context
export const ThemeContext = createContext();

export default function ThemeContextProvider({children}) {
    //create state
    const [darkMode, setDarkMode] = useState(true);

    useEffect(
        ()=> {
            const theme = JSON.parse(localStorage.getItem('darkMode'));
            if(theme !== null){
                setDarkMode(theme);
            }
        }, []
    )

    return(
        <ThemeContext.Provider value={{darkMode, setDarkMode}}>
            {children}
        </ThemeContext.Provider>
    )
}