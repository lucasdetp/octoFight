import React from 'react';
import { Text as RNText, StyleSheet } from 'react-native';

const Name = ({ content, style }) => {
    return <RNText style={style}>{content}</RNText>;
  };

const styles = StyleSheet.create({
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
});

export default Name;
