import React from 'react';
import { StyleSheet } from 'react-native';
import { Container } from '../../atoms';
import { ImageNameRappeur, Stats } from '../../molecules';

const CardRappeur = ({ rapper }) => {
    const getCardStyle = (rarity) => {
        switch (rarity) {
            case 'Légendaire':
                return {
                    backgroundColor: '#FFD700',
                    borderColor: '#DAA520',
                    borderWidth: 3,
                };
            case 'épique':
                return {
                    backgroundColor: '#D3D3D3',
                    borderColor: '#808080',
                    borderWidth: 1,
                };
            case 'Rare':
                return {
                    backgroundColor: '#C0C0C0',
                    borderColor: '#A9A9A9',
                    borderWidth: 2,
                };
            default:
                return {
                    backgroundColor: '#F00',
                    borderColor: '#000000',
                    borderWidth: 1,
                };
        }
    };

    return (
        <Container.Card style={getCardStyle(rapper.rarity)}>
            <ImageNameRappeur style={getCardStyle(rapper.rarity)} rapper={rapper} />
            <Stats.StatsRappeur style={getCardStyle(rapper.rarity)} attack={rapper.attack} defense={rapper.defense} rarity={rapper.rarity} />
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
