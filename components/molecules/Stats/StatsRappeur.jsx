import React from 'react';
import { StyleSheet } from 'react-native';
import { Container, Text } from '../../atoms';

const StatsRappeur = ({ attack, defense, rarity }) => {
    return (
        <Container.Text style={styles.statsContainer}>
            <Text.State label="Attaque :" value={attack} />
            <Text.State label="Défense :" value={defense} />
            <Text.Rarity rarity={rarity} />
        </Container.Text>
    );
};

const styles = StyleSheet.create({
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 10,
    },
});

export default StatsRappeur;
