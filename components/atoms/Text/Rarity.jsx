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
    if (!rarity) return 'gray';
    switch (rarity.toLowerCase()) {
        case 'légendaire':
            return 'gold';
        case 'épique':
            return 'purple';
        case 'rare':
            return 'blue';
        case 'commun':
            return 'green';
        default:
            return 'gray';
    }
};


const styles = StyleSheet.create({
    rarityValue: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default Rarity;
