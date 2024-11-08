import React from 'react';
import { View, StyleSheet } from 'react-native';
import Base from '../atoms/Button/Base';
import Button from '../atoms/Button/Button';

const ProfileInfoCard = ({ name, email, onLogout }) => {
    return (
        <View style={styles.card}>
            <View style={styles.infoContainer}>
                <Base title={`Nom: ${name}`} style={styles.text} />
                <Base title={`Email: ${email}`} style={styles.text} />
            </View>
            <Button title="Se déconnecter" onClick={onLogout} style={styles.logoutButton} />
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        padding: 20,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        backgroundColor: '#000',
        width: '90%',
        alignItems: 'center',
        marginBottom: 20,
    },
    infoContainer: {
        marginBottom: 15,
    },
    text: {
        fontSize: 16,
        color: '#ffffff',
    },
    logoutButton: {
        backgroundColor: '#007BFF',
    },
});

export default ProfileInfoCard;
