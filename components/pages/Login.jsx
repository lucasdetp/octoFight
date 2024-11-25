import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../../providers/ThemeProvider';
import api from '../axiosConfig';

const Login = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const { isNight } = useTheme();

    const handleLogin = async () => {
        try {
            const response = await api.post('/login', {
                email,
                password,
            });

            if (response.status === 200) {
                console.log('Login successful:', response.data);
                setMessage('Login successful');
                navigation.navigate('Home');
            }
        } catch (error) {
            console.error('Login error:', error.response ? error.response.data : error.message);
            setMessage('Failed to login. Please check your credentials.');
        }
    };

    return (
        <View style={[styles.container, { backgroundColor: isNight ? '#000' : '#fff' }]}>
            <Text style={[styles.title, { color: isNight ? '#fff' : '#000' }]}>Login</Text>
            <TextInput
                style={[styles.input, { backgroundColor: isNight ? '#333' : '#fff', color: isNight ? '#fff' : '#000' }]}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                placeholderTextColor={isNight ? '#aaa' : '#999'}
            />
            <TextInput
                style={[styles.input, { backgroundColor: isNight ? '#333' : '#fff', color: isNight ? '#fff' : '#000' }]}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                placeholderTextColor={isNight ? '#aaa' : '#999'}
            />
            <TouchableOpacity style={[styles.button, { backgroundColor: isNight ? '#444' : '#007BFF' }]} onPress={handleLogin}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            {message ? <Text style={[styles.message, { color: isNight ? 'red' : 'red' }]}>{message}</Text> : null}
            <Text style={[styles.registerText, { color: isNight ? '#1E90FF' : '#007BFF' }]} onPress={() => navigation.navigate('Register')}>
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
    },
    registerText: {
        marginTop: 15,
    },
});

export default Login;
