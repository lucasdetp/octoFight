import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import Button from '../../components/atoms/Button/Button'; // Assurez-vous du bon chemin d'import
import api from '../api';

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
            const response = await api.post('https://10.26.130.75:8000/api/register', {
                name,
                email,
                password,
                password_confirmation: confirmPassword,
            });

            if (response.status === 201) {
                console.log('Registration successful:', response.data);
                Alert.alert('Succès', 'Inscription réussie');
                navigation.navigate('Login'); // Naviguer vers la page de connexion après l'inscription réussie
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
        <View style={styles.container}>
            <Text style={styles.title}>Register</Text>
            <TextInput
                style={styles.input}
                placeholder="Name"
                value={name}
                onChangeText={setName}
                placeholderTextColor="#999"
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                placeholderTextColor="#999"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                placeholderTextColor="#999"
            />
            <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
                placeholderTextColor="#999"
            />
            <Button title="Register" onClick={handleRegister} />
            <Text style={styles.loginText} onPress={() => navigation.navigate('Login')}>
                Already have an account? Login
            </Text>
        </View>
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
