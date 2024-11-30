import React from 'react';
import { StyleSheet } from 'react-native';
import { Container, Button } from '../atoms';

const ProfileInfoCard = ({ name, email, onLogout }) => {
    return (
        <Container.BasicView style={styles.card}>
            <Container.BasicView style={styles.infoContainer}>
                <Button.Base title={`Nom: ${name}`} style={styles.text} />
                <Button.Base title={`Email: ${email}`} style={styles.text} />
            </Container.BasicView>
            <Button.Button title="Se déconnecter" onClick={onLogout} style={styles.logoutButton} />
        </Container.BasicView>
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
