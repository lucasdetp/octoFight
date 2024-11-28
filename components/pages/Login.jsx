import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import api from '../api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as pJson from '../../package.json';
import { Button, Text } from '../atoms';

const Login = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);


    const handleLogin = async () => {
        try {

            const response = await api.post(`${pJson.proxy}/api/login`, {

                email,
                password,
            });

            if (response.status === 200) {
                console.log('Login successful:', response.data);
                await AsyncStorage.setItem('token', response.data.token);
                await AsyncStorage.setItem('authToken', response.data.token);
                await AsyncStorage.setItem('id', response.data.user.id.toString());

                setIsLoggedIn(true);
                setMessage('Login successful');
                navigation.navigate('Home');
            }
        } catch (error) {
            console.error('Login error:', error.response ? error.response.data : error.message);
            setMessage('Failed to login. Please check your credentials.');

            if (error.response && error.response.data && error.response.data.message) {
                setMessage(error.response.data.message);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text.Name style={styles.title}>Se connecter</Text.Name>
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
            <Button.CustomButton 
                title="Se connecter" 
                onPress={handleLogin} 
                buttonStyle={styles.customButton} 
                textStyle={styles.customText} 
            />
            {message ? <Text.Name style={styles.message}>{message}</Text.Name> : null}
            <Text.RedirectLink text="Vous n'avez pas de compte? Inscrivez-vous" onPress={() => navigation.navigate('Register')} />
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
    button: {
        backgroundColor: '#007BFF',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    message: {
        marginTop: 15,
        fontSize: 16,
        color: 'red',
    },
    registerText: {
        marginTop: 15,
        color: '#007BFF',
    },
});

export default Login;
