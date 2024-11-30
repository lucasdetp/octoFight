import React from 'react';
import { Text, StyleSheet } from 'react-native';

const RedirectLink = ({ text, onPress, style, textStyle }) => {
    return (
        <Text style={[styles.link, textStyle, style]} onPress={onPress}>
            {text}
        </Text>
    );
};

const styles = StyleSheet.create({
    link: {
        color: '#007BFF', 
        marginTop: 15,
        textDecorationLine: 'underline',
        fontSize: 16,
        marginVertical: 10,
    },
});

export default RedirectLink;
