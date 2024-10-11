import React from 'react';
import { View, StyleSheet } from 'react-native';

const Text = ({ children }) => {
    return <View style={styles.card}>{children}</View>;
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#FFFFFF',
        elevation: 5,
        margin: 10,
        alignItems: 'center',
    },
});

export default Text;
