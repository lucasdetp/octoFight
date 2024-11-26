import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import api from '../api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleLogin = async () => {
        try {

            const response = await api.post('http://10.26.130.75:8000/api/login', {

                email,
                password,
            });

            if (response.status === 200) {
                console.log('Login successful:', response.data);
                await AsyncStorage.setItem('token', response.data.token);
                setMessage('Login successful');

                await AsyncStorage.setItem('authToken', response.data.token);
                await AsyncStorage.setItem('id', response.data.user.id.toString()); 


                navigation.navigate('Home');
            }
        } catch (error) {
            console.error('Login error:', error.response ? error.response.data : error.message);
            setMessage('Failed to login. Please check your credentials.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
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
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            {message ? <Text style={styles.message}>{message}</Text> : null}
            <Text style={styles.registerText} onPress={() => navigation.navigate('Register')}>
                Don't have an account? Register
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
