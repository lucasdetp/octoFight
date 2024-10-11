import React from 'react';
import { StyleSheet } from 'react-native';
import { Container } from '../../atoms';
import { ImageNameRappeur, Stats } from '../../molecules'; 

const CardRappeur = ({ rapper }) => {
    return (
        <Container.Card style={styles.content}>
            <ImageNameRappeur rapper={rapper} />
            <Stats.StatsRappeur attack={rapper.attack} defense={rapper.defense} rarity={rapper.rarity} />
        </Container.Card>
    );
};

const styles = StyleSheet.create({
    content: {
        alignItems: 'center',
    }
});

export default CardRappeur;
