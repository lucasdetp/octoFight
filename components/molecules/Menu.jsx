import React from 'react';
import { View, StyleSheet } from 'react-native';
import StyledButton from '../nanites/DOM/StyledButton';

const Menu = ({ configs, onMenuChange }) => {
    return (
        <View style={styles.container}>
            {configs.map((config, index) => (
                <StyledButton
                    key={index}
                    title={config.displayName}
                    onPress={() => onMenuChange(config.slug)}
                />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
    },
});

export default Menu;
