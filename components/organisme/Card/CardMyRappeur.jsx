import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { Container } from '../../atoms';
import { ImageNameRappeur, Stats } from '../../molecules';

const CardMyRappeur = ({ rapper }) => {
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
                    color: '#fff',
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


    const getRarityStyle = (rarity) => {
        switch (rarity) {
            case 'légendaire':
                return {
                    color: '#FFD700',
                    textShadowColor: 'rgba(255, 223, 0, 1)', // Jaune intense
                    textShadowOffset: { width: 0, height: 0 },
                    textShadowRadius: 10, // Rayon de l'effet fluo
                };
            case 'épique':
                return {
                    color: '#B300FF',
                    textShadowColor: 'rgba(179, 0, 255, 1)', // Violet intense
                    textShadowOffset: { width: 0, height: 0 },
                    textShadowRadius: 10,
                };
            case 'rare':
                return {
                    color: '#1E90FF',
                    textShadowColor: 'rgba(30, 144, 255, 1)', // Bleu intense
                    textShadowOffset: { width: 0, height: 0 },
                    textShadowRadius: 10,
                };
            default:
                return {
                    color: '#FFFFFF',
                    textShadowColor: 'rgba(255, 255, 255, 0.8)', // Blanc intense
                    textShadowOffset: { width: 0, height: 0 },
                    textShadowRadius: 5,
                };
        }
    };


    const rarity = rapper?.rarity || 'commun';
    const attaque = rapper?.attaque || 0;
    const defense = rapper?.defense || 0;

    return (
        <Container.Card style={[styles.cardContainer, getCardStyle(rarity)]}>
            <Text style={[styles.rarityBadge, getRarityStyle(rarity)]}>{rarity}</Text>
            <ImageNameRappeur rapper={rapper} />
            <Stats.StatsRappeur style={[styles.stats]} attack={attaque} defense={defense} />
        </Container.Card>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        width: '100%',
        padding: 10,
        borderRadius: 8,
        position: 'relative',
        backgroundColor: '#fff',
    },
    rarityBadge: {
        alignSelf: 'flex-start',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 15,
        fontWeight: 'bold',
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 10,
        backgroundColor: '#000',
    },

    priceText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10,
    },
    buyButton: {
        backgroundColor: 'green',
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },
    buyButtonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default CardMyRappeur;
