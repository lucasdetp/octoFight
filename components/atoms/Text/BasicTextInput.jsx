import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const BasicTextInput = ({ 
    style, 
    placeholder, 
    value, 
    onChangeText, 
    placeholderTextColor = '#999', 
    ...props 
}) => {
    return (
        <TextInput
            style={[styles.input, style]}
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeText}
            placeholderTextColor={placeholderTextColor}
            {...props} 
        />
    );
};

const styles = StyleSheet.create({
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        fontSize: 16,
        color: '#333',
        marginVertical: 8,
    },
});

export default BasicTextInput;
