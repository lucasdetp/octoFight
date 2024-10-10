import React from 'react';
import { Text, StyleSheet } from 'react-native';

const Rarity = ({ rarity }) => {
    return (
        <Text style={[styles.rarityValue, { color: getRarityColor(rarity) }]}>
            {rarity}
        </Text>
    );
};

const getRarityColor = (rarity) => {
    switch (rarity.toLowerCase()) {
        case 'légendaire':
            return '#FFD700';
        case 'épique':
            return '#9400D3';
        case 'rare':
            return '#1E90FF';
        case 'commun':
            return '#808080';
        default:
            return '#000000';
    }
};

const styles = StyleSheet.create({
    rarityValue: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default Rarity;
