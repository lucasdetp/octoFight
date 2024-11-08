import React, { createContext, useState, useContext } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [isNight, setIsNight] = useState(false);

    const toggleTheme = () => {
        setIsNight((prevIsNight) => !prevIsNight);
    };

    return (
        <ThemeContext.Provider value={{ isNight, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
