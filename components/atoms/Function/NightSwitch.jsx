import React, { useEffect, useRef } from 'react';
import { TouchableOpacity, View, StyleSheet, Animated } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../../../providers/OctoThemeProvider';

const NightSwitch = () => {
    const { isNight, toggleTheme } = useTheme();

    const translateX = useRef(new Animated.Value(isNight ? 30 : 0)).current;

    useEffect(() => {
        Animated.timing(translateX, {
            toValue: isNight ? 60 : 0,
            duration: 300,
            useNativeDriver: true,
        }).start();
    }, [isNight]);

    return (
        <TouchableOpacity onPress={toggleTheme} style={[styles.switch, { backgroundColor: isNight ? '#333' : '#0303' }]}>
            <Animated.View
                style={[styles.iconContainer, { transform: [{ translateX }] }]}
            >
                <MaterialIcons
                    name={isNight ? 'brightness-2' : 'wb-sunny'}
                    size={28}
                    color={isNight ? '#fff' : '#000'}
                />
            </Animated.View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    switch: {
        width: 100,
        height: 50,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: 5,
        position: 'relative',
    },
    iconContainer: {
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default NightSwitch;
