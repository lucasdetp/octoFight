import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const CustomButton = ({ onPress, title, buttonStyle, textStyle }) => {
    return (
        <TouchableOpacity style={[styles.button, buttonStyle]} onPress={onPress}>
            <Text style={[styles.buttonText, textStyle]}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#007BFF', 
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
    },
    buttonText: {
        color: '#FFFFFF', 
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default CustomButton;
