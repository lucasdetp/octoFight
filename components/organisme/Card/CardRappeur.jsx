import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Container } from '../../atoms';
import { ImageNameRappeur, Stats } from '../../molecules';

const CardRappeur = ({ rapper, onBuy }) => {
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
        <Container.Card style={[styles.cardContainer, getCardStyle(rapper.rarity)]}>
            <ImageNameRappeur rapper={rapper} />
            <Stats.StatsRappeur attack={rapper.attaque} defense={rapper.defense} rarity={rapper.rarity} />
            
            <TouchableOpacity style={styles.buyButton} onPress={() => onBuy(rapper.id)}>
                <Text style={styles.buyButtonText}>Acheter</Text>
            </TouchableOpacity>
        </Container.Card>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        width: '45%', 
        marginBottom: 10,
        borderRadius: 8,
        padding: 10,
        position: 'relative',
    },
    buyButton: {
        backgroundColor: '#1E90FF', 
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buyButtonText: {
        color: '#fff',
        fontSize: 16,
    }
});

export default CardRappeur;
