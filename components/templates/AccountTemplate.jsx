import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Button from '../atoms/Button/Button';

const AccountTemplate = ({ user, onLogout, onUpdate }) => {
    if (!user) {
        return (
            <View style={styles.container}>
                <Text>Erreur lors de la récupération des informations utilisateur.</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bienvenue {user.name} !</Text>
            <Button title="Mettre à jour le profil" onClick={onUpdate} />
            <Button title="Déconnexion" onClick={onLogout} />
            <Button title="Changer le mot de passe" onClick={() => console.log('Change password')} />
        </View>
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
