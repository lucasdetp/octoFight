import React from 'react';
import { TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../../providers/ThemeProvider';

const NightSwitch = () => {
    const { isNight, toggleTheme } = useTheme();

    return (
        <TouchableOpacity onPress={toggleTheme}>
            <MaterialIcons name={isNight ? "brightness-2" : "wb-sunny"} size={28} color={isNight ? "#ffffff" : "#000000"} />
        </TouchableOpacity>
    );
};

export default NightSwitch;
