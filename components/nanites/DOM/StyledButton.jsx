import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const StyledButton = ({ title, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.button}>
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        padding: 10,
        backgroundColor: 'blue',
        borderRadius: 5,
    },
    text: {
        color: 'white',
        textAlign: 'center',
    },
});

export default StyledButton;
