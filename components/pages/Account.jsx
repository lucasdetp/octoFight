import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import Button from '../../components/atoms/Button/Button';
import api from '../axiosConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../../providers/ThemeProvider';

const Account = ({ navigation }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPasswordFields, setShowPasswordFields] = useState(false);
    const { isNight } = useTheme();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                setLoading(true);
                const token = await AsyncStorage.getItem('authToken');
                if (!token) {
                    console.log('Token is missing, redirecting to Login');
                    navigation.navigate('Login');
                    return;
                }

                console.log('Using token:', token);

                const response = await api.get('/user', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.status === 200) {
                    setUser(response.data);
                } else {
                    throw new Error('Invalid token or user not found');
                }
            } catch (error) {
                console.error('Error fetching user data:', error.response ? error.response.data : error.message);
                Alert.alert('Erreur', 'Impossible de récupérer les informations utilisateur.');
                navigation.navigate('Login');
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [navigation]);

    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('authToken');
            console.log('Token removed successfully');
            navigation.navigate('Login');
        } catch (error) {
            console.error('Error during logout:', error);
            Alert.alert('Erreur', 'Une erreur s\'est produite lors de la déconnexion.');
        }
    };

    const handleChangePassword = async () => {
        if (newPassword !== confirmPassword) {
            Alert.alert('Erreur', 'Les nouveaux mots de passe ne correspondent pas.');
            return;
        }

        try {
            const token = await AsyncStorage.getItem('authToken');
            const response = await api.post(
                '/user/change-password',
                {
                    current_password: currentPassword,
                    new_password: newPassword,
                    new_password_confirmation: confirmPassword,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.status === 200) {
                Alert.alert('Succès', 'Mot de passe mis à jour avec succès.');
                setCurrentPassword('');
                setNewPassword('');
                setConfirmPassword('');
            } else {
                throw new Error('Failed to change password');
            }
        } catch (error) {
            console.error('Error changing password:', error.response ? error.response.data : error.message);
            Alert.alert('Erreur', 'Une erreur s\'est produite lors de la modification du mot de passe.');
        }
    };

    if (loading) {
        return (
            <View style={[styles.container, { backgroundColor: isNight ? '#000' : '#fff' }]}>
                <ActivityIndicator size="100" color={isNight ? '#ffffff' : '#0000ff'} />
            </View>
        );
    }

    if (!user) {
        return (
            <View style={[styles.container, { backgroundColor: isNight ? '#000' : '#fff' }]}>
                <Text style={{ color: isNight ? '#ffffff' : '#000000' }}>
                    Erreur lors de la récupération des informations utilisateur.
                </Text>
            </View>
        );
    }

    return (
        <View style={[styles.container, { backgroundColor: isNight ? '#000' : '#fff' }]}>
            <Text style={[styles.title, { color: isNight ? '#ffffff' : '#000000' }]}>
                Bienvenue {user.name} !
            </Text>
            <Button title="Déconnexion" onClick={handleLogout} />
            <Button
                title="Changer le mot de passe"
                onClick={() => setShowPasswordFields(!showPasswordFields)}
            />

            {showPasswordFields && (
                <View style={styles.passwordContainer}>
                    <Text style={[styles.subtitle, { color: isNight ? '#ffffff' : '#000000' }]}>Changer le mot de passe</Text>
                    <TextInput
                        style={[styles.input, { backgroundColor: isNight ? '#333' : '#fff', color: isNight ? '#fff' : '#000' }]}
                        placeholder="Mot de passe actuel"
                        value={currentPassword}
                        onChangeText={setCurrentPassword}
                        secureTextEntry
                        placeholderTextColor={isNight ? "#aaa" : "#999"}
                    />
                    <TextInput
                        style={[styles.input, { backgroundColor: isNight ? '#333' : '#fff', color: isNight ? '#fff' : '#000' }]}
                        placeholder="Nouveau mot de passe"
                        value={newPassword}
                        onChangeText={setNewPassword}
                        secureTextEntry
                        placeholderTextColor={isNight ? "#aaa" : "#999"}
                    />
                    <TextInput
                        style={[styles.input, { backgroundColor: isNight ? '#333' : '#fff', color: isNight ? '#fff' : '#000' }]}
                        placeholder="Confirmer le nouveau mot de passe"
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        secureTextEntry
                        placeholderTextColor={isNight ? "#aaa" : "#999"}
                    />
                    <Button title="Confirmer le changement" onClick={handleChangePassword} />
                </View>
            )}
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
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    subtitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20,
    },
    passwordContainer: {
        width: '100%',
        marginTop: 20,
    },
    input: {
        width: '100%',
        padding: 10,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
    },
});

export default Account;
