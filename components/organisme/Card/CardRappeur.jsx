import React from 'react';
import { StyleSheet } from 'react-native';
import { Container } from '../../atoms';
import { ImageNameRappeur, Stats } from '../../molecules';

const CardRappeur = ({ rapper }) => {
    const getCardStyle = (rarity) => {
        switch (rarity) {
            case 'légendaire':
                return {
                    backgroundColor: '#FFD700',
                    borderColor: '#DAA520',
                    borderWidth: 4,
                };
            case 'épique':
                return {
                    backgroundColor: '#9400D3',
                    borderColor: '#000000',
                    borderWidth: 3,
                };
            case 'rare':
                return {
                    backgroundColor: '#1E90FF',
                    borderColor: '#000000',
                    borderWidth: 2,
                };
            default:
                return {
                    backgroundColor: '#FFFFFF',
                    borderColor: '#000000',
                    borderWidth: 1,
                };
        }
    };

    return (
        <Container.Card style={getCardStyle(rapper.rarity)}>
            <ImageNameRappeur style={getCardStyle(rapper.rarity)} rapper={rapper} />
            <Stats.StatsRappeur style={getCardStyle(rapper.rarity)} attack={rapper.attaque} defense={rapper.defense} rarity={rapper.rarity} />
        </Container.Card>
    );
};

const styles = StyleSheet.create({
    content: {
        alignItems: 'center',
        borderRadius: 10,
        padding: 10,
        marginVertical: 10,
    },
});

export default CardRappeur;
