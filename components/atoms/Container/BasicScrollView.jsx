import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';

const BasicScrollView = ({ children, contentContainerStyle, style }) => {
    return (
        <ScrollView style={style} contentContainerStyle={[styles.contentContainer, contentContainerStyle]}>
            {children}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    contentContainer: {
        padding: 16,
    },
});

export default BasicScrollView;
