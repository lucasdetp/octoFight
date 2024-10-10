import React from 'react';
import { View, StyleSheet } from 'react-native';

const Card = ({ children }) => {
    return <View style={styles.card}>{children}</View>;
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 5,
        margin: 10,
        padding: 15,
        alignItems: 'center',
    },
});

export default Card;
