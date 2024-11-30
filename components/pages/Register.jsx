import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import api from '../api';
import * as pJson from '../../package.json';
import { Button, Text, Container } from '../atoms';

const Register = ({ navigation }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleRegister = async () => {
        if (password !== confirmPassword) {
            Alert.alert('Erreur', 'Le mot de passe et la confirmation ne correspondent pas.');
            return;
        }

        try {
            const response = await api.post(`${pJson.proxy}/api/register`, {

                name,
                email,
                password,
                password_confirmation: confirmPassword,
            });

            if (response.status === 201) {
                console.log('Registration successful:', response.data);
                Alert.alert('Succès', 'Inscription réussie');
                navigation.navigate('Login');
            }
        } catch (error) {
            if (error.response) {
                console.error('Response error:', error.response.data);
                Alert.alert('Erreur', error.response.data.message);
            } else {
                console.error('Registration error:', error.message);
                Alert.alert('Erreur', 'Une erreur est survenue. Veuillez réessayer.');
            }
        }
    };

    return (
        <Container.BasicView style={styles.container}>
            <Text.Name style={styles.title}>S'inscrire</Text.Name>
            <Text.BasicTextInput
                style={styles.input}
                placeholder="Prénom"
                value={name}
                onChangeText={setName}
                placeholderTextColor="#999"
            />
            <Text.BasicTextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                placeholderTextColor="#999"
            />
            <Text.BasicTextInput
                style={styles.input}
                placeholder="Mot de passe"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                placeholderTextColor="#999"
            />
            <Text.BasicTextInput
                style={styles.input}
                placeholder="Confirmer le mot de passe"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
                placeholderTextColor="#999"
            />
            <Button.Button title="S'inscire" onClick={handleRegister} />
            <Text.RedirectLink text="Vous avez déjà un compte? Connectez-vous"  style={styles.loginText} onPress={() => navigation.navigate('Login')}/>
        </Container.BasicView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 30,
    },
    input: {
        width: '100%',
        padding: 10,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
    },
    loginText: {
        marginTop: 15,
        color: '#007BFF',
    },
});

export default Register;
