import React from 'react';
import { StyleSheet } from 'react-native';
import StyledButton from '../nanites/DOM/StyledButton';
import { Container } from '../atoms';

const Menu = ({ configs, onMenuChange }) => {
    return (
        <Container.BasicView style={styles.container}>
            {configs.map((config, index) => (
                <StyledButton
                    key={index}
                    title={config.displayName}
                    onPress={() => onMenuChange(config.slug)}
                />
            ))}
        </Container.BasicView>
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
