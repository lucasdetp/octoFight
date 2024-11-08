import React from 'react';
import { TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const NightSwitch = ({ onPress, isNight }) => {
    return (
        <TouchableOpacity onPress={() => {
            console.log('NightSwitch pressed');
            onPress();
        }}>
            <MaterialCommunityIcons
                name={isNight ? 'weather-night' : 'white-balance-sunny'}
                size={28}
                color={isNight ? '#fff' : '#000'}
            />
        </TouchableOpacity>
    );
};

export default NightSwitch;
