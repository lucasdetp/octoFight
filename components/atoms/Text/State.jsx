import React from 'react';
import { Text, StyleSheet, View } from 'react-native';

const State = ({ label, value }) => {
    return (
        <View style={styles.stat}>
            <Text style={styles.label}>{label}</Text>
            <Text style={styles.value}>{value}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    stat: {
        alignItems: 'center',
        marginHorizontal: 10,
    },
    label: {
        fontSize: 14,
        color: '#333',
    },
    value: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
});

export default State;
