import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../../providers/ThemeProvider';
import api from '../axiosConfig';

const Register = ({ navigation }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const { isNight } = useTheme();

    const handleRegister = async () => {
        if (password !== confirmPassword) {
            setMessage('Passwords do not match');
            return;
        }

        try {
            const response = await api.post('/register', {
                name,
                email,
                password,
                password_confirmation: confirmPassword,
            });

            if (response.status === 201) {
                console.log('Registration successful:', response.data);
                setMessage('Registration successful');
                navigation.navigate('Login');
            }
        } catch (error) {
            console.error('Registration error:', error.response ? error.response.data : error.message);
            setMessage('Failed to register. Please try again.');
        }
    };

    return (
        <View style={[styles.container, { backgroundColor: isNight ? '#000' : '#fff' }]}>
            <Text style={[styles.title, { color: isNight ? '#fff' : '#000' }]}>Register</Text>
            <TextInput
                style={[styles.input, { backgroundColor: isNight ? '#333' : '#fff', color: isNight ? '#fff' : '#000' }]}
                placeholder="Name"
                value={name}
                onChangeText={setName}
                placeholderTextColor={isNight ? '#aaa' : '#999'}
            />
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
            <TextInput
                style={[styles.input, { backgroundColor: isNight ? '#333' : '#fff', color: isNight ? '#fff' : '#000' }]}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
                placeholderTextColor={isNight ? '#aaa' : '#999'}
            />
            <TouchableOpacity style={[styles.button, { backgroundColor: isNight ? '#444' : '#007BFF' }]} onPress={handleRegister}>
                <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
            {message ? <Text style={[styles.message, { color: isNight ? 'red' : 'red' }]}>{message}</Text> : null}
            <Text style={[styles.loginText, { color: isNight ? '#1E90FF' : '#007BFF' }]} onPress={() => navigation.navigate('Login')}>
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
    loginText: {
        marginTop: 15,
    },
});

export default Register;
