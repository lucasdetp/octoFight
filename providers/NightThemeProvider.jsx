import React, { createContext, useState } from 'react';

const NightThemeProviderContext = createContext(null);

const NightThemeProvider = ({ children }) => {
    const [isNight, setIsNight] = useState(false);

    const toggleNightMode = () => {
        setIsNight(prevIsNight => !prevIsNight);
    };

    return (
        <NightThemeProviderContext.Provider
            value={{
                isNight,
                toggleNightMode,
            }}
        >
            {children}
        </NightThemeProviderContext.Provider>
    );
};

export { NightThemeProviderContext, NightThemeProvider };
