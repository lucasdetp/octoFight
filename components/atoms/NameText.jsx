import React from 'react';
import { Text, StyleSheet } from 'react-native';

const NameText = ({ children }) => {
    return <Text style={styles.name}>{children}</Text>;
};

const styles = StyleSheet.create({
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
});

export default NameText;
