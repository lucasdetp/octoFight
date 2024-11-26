import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ThemeContext = createContext();

export const useTheme = () => {
    return useContext(ThemeContext);
};

export const ThemeProvider = ({ children }) => {
    const [isNight, setIsNight] = useState(false);

    useEffect(() => {
        const fetchTheme = async () => {
            try {
                const savedTheme = await AsyncStorage.getItem('theme');
                if (savedTheme !== null) {
                    setIsNight(savedTheme === 'night');
                }
            } catch (e) {
                console.error('Failed to load theme', e);
            }
        };
        fetchTheme();
    }, []);

    const toggleTheme = async () => {
        const newTheme = !isNight;
        setIsNight(newTheme);
        try {
            await AsyncStorage.setItem('theme', newTheme ? 'night' : 'day');
        } catch (e) {
            console.error('Failed to save theme', e);
        }
    };

    return (
        <ThemeContext.Provider value={{ isNight, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
