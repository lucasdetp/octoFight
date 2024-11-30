import React from 'react';
import { StyleSheet } from 'react-native';
import { Container, Text } from '../../atoms';

const StatsRappeur = ({ attack = 0, defense = 0, rarity = 'commun' }) => {
    return (
        <Container.Text style={styles.statsContainer}>
            <Text.State label="Attaque :" value={attack} />
            <Text.State label="Défense :" value={defense} />
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
