import React from 'react';
import { View, StyleSheet } from 'react-native';

const BasicView = ({ children, style }) => {
    return (
        <View style={[styles.container, style]}>
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
});

export default BasicView;
