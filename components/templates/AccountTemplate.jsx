import React from 'react';
import { StyleSheet } from 'react-native';
import { Container, Text, Button } from '../atoms';

const AccountTemplate = ({ user, onLogout, onUpdate }) => {
    if (!user) {
        return (
            <Container.BasicView style={styles.container}>
                <Text.Name>Erreur lors de la récupération des informations utilisateur.</Text.Name>
            </Container.BasicView>
        );
    }

    return (
        <Container.BasicView style={styles.container}>
            <Text.Name style={styles.title}>Bienvenue {user.name} !</Text.Name>
            <Button.Button title="Mettre à jour le profil" onClick={onUpdate} />
            <Button.Button title="Déconnexion" onClick={onLogout} />
            <Button.Button title="Changer le mot de passe" onClick={() => console.log('Change password')} />
        </Container.BasicView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default AccountTemplate;
