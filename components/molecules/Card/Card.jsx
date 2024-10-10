import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Text } from '../../atoms';

const Card = ({ rapper }) => {
    return (
        <View style={styles.card}>
      
            <Image source={{ uri: rapper.image }} style={styles.image} />
            <View style={styles.content}>
                <Text.Name content={rapper.name} /> 
                <View style={styles.statsContainer}>
                    <Text.State label="Attaque :" value={rapper.attack} />
                    <Text.State label="Défense :" value={rapper.defense} />
                </View>
                <View style={styles.rarityContainer}>
                    <Text.Rarity rarity={rapper.rarity} />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 5,
        margin: 10,
        padding: 15,
        alignItems: 'center',
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
    },
    content: {
        alignItems: 'center',
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 10,
    },
    rarityContainer: {
        marginTop: 10,
    },
});

export default Card;
