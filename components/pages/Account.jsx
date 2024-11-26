import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, TextInput, StyleSheet, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from '../../components/atoms/Button/Button';
import NightSwitch from '../../components/atoms/Function/NightSwitch';
import api from '../api';
import * as pJson from '../../package.json';
import { FooterNavBar } from '../molecules';

const Account = ({ navigation }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [currentCategory, setCurrentCategory] = useState('account');
    const [isNight, setIsNight] = useState(false); // Ajout du mode nuit


    const categories = [
        { id: 'account', name: 'Mon compte' },
        { id: 'password', name: 'Sécurité' },
        { id: 'theme', name: 'Thème' },
        { id: 'help', name: 'Aide' },
    ];

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                setLoading(true);
                const token = await AsyncStorage.getItem('authToken');
                if (!token) {
                    navigation.navigate('Login');
                    return;
                }

                const response = await api.get(`${pJson.proxy}/api/user`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (response.status === 200) {
                    setUser(response.data);
                    setName(response.data.name);
                    setEmail(response.data.email);
                } else {
                    throw new Error('Invalid token or user not found');
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
                Alert.alert('Erreur', 'Impossible de récupérer les informations utilisateur.');
                navigation.navigate('Login');
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [navigation]);

    const handleSaveChanges = async () => {
        try {
            const token = await AsyncStorage.getItem('authToken');
            const response = await api.put(
                `${pJson.proxy}/api/user`,
                { name, email },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (response.status === 200) {
                Alert.alert('Succès', 'Informations mises à jour avec succès.');
            } else {
                throw new Error('Failed to update user information');
            }
        } catch (error) {
            console.error('Error updating user information:', error);
            Alert.alert('Erreur', 'Une erreur s\'est produite lors de la mise à jour des informations.');
        }
    };

    const handleThemeToggle = () => {
        setIsNight(!isNight);
    };

    const renderCategory = () => {
        switch (currentCategory) {
            case 'account':
                return (
                    <View>
                        <Text style={[styles.title, { color: isNight ? '#fff' : '#000' }]}>Mon compte</Text>

                        <Text style={[styles.label, { color: isNight ? '#fff' : '#000', marginTop: 20, marginBottom: 10 }]}>Nom</Text>
                        <TextInput
                            style={[
                                styles.input,
                                { backgroundColor: isNight ? '#333' : '#fff', color: isNight ? '#fff' : '#000' },
                            ]}
                            placeholder="Nom"
                            value={name}
                            onChangeText={setName}
                            placeholderTextColor={isNight ? '#aaa' : '#999'}
                        />
                        <Text style={[styles.label, { color: isNight ? '#fff' : '#000', marginTop: 10, marginBottom: 10 }]}>Email</Text>
                        <TextInput
                            style={[
                                styles.input,
                                { backgroundColor: isNight ? '#333' : '#fff', color: isNight ? '#fff' : '#000', marginBottom: 30 },
                            ]}
                            placeholder="Email"
                            value={email}
                            onChangeText={setEmail}
                            placeholderTextColor={isNight ? '#aaa' : '#999'}
                        />
                        <Button style={styles.save} title="Enregistrer les modifications" onClick={handleSaveChanges} />
                    </View>
                );
            case 'password':
                return (
                    <View>
                        <Text style={[styles.title, { color: isNight ? '#fff' : '#000' }]}>
                            Changer le mot de passe
                        </Text>
                        <TextInput
                            style={[
                                styles.input,
                                { backgroundColor: isNight ? '#333' : '#fff', color: isNight ? '#fff' : '#000' },
                            ]}
                            placeholder="Mot de passe actuel"
                            value={currentPassword}
                            onChangeText={setCurrentPassword}
                            secureTextEntry
                            placeholderTextColor={isNight ? '#aaa' : '#999'}
                        />
                        <TextInput
                            style={[
                                styles.input,
                                { backgroundColor: isNight ? '#333' : '#fff', color: isNight ? '#fff' : '#000' },
                            ]}
                            placeholder="Nouveau mot de passe"
                            value={newPassword}
                            onChangeText={setNewPassword}
                            secureTextEntry
                            placeholderTextColor={isNight ? '#aaa' : '#999'}
                        />
                        <TextInput
                            style={[
                                styles.input,
                                { backgroundColor: isNight ? '#333' : '#fff', color: isNight ? '#fff' : '#000' },
                            ]}
                            placeholder="Confirmer le nouveau mot de passe"
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            secureTextEntry
                            placeholderTextColor={isNight ? '#aaa' : '#999'}
                        />
                        <Button title="Confirmer le changement" onClick={() => Alert.alert('Mot de passe changé')} />
                    </View>
                );
            case 'theme':
                return (
                    <View>
                        <Text style={[styles.title, { color: isNight ? '#fff' : '#000' }]}>Mode Nuit</Text>
                        <NightSwitch isEnabled={isNight} toggleSwitch={handleThemeToggle} />
                    </View>
                );
            case 'help':
                return (
                    <View>
                        <Text style={[styles.title, { color: isNight ? '#fff' : '#000' }]}>Aide</Text>
                        <Text style={[styles.helpText, { color: isNight ? '#ccc' : '#333' }]}>
                            Besoin d'aide ? Contactez-nous à support@exemple.com.
                        </Text>
                    </View>
                );
            default:
                return null;
        }
    };

    if (loading) {
        return (
            <View style={[styles.container, { backgroundColor: isNight ? '#000' : '#fff' }]}>
                <ActivityIndicator size="large" color={isNight ? '#fff' : '#0000ff'} />
            </View>
        );
    }

    return (
        <View style={styles.wrapper}>
            <View style={styles.sidebar}>
                {categories.map((category) => (
                    <TouchableOpacity
                        key={category.id}
                        style={[
                            styles.categoryButton,
                            { backgroundColor: currentCategory === category.id ? '#1993DF' : 'transparent', borderTopWidth: 0.5, borderBottomWidth: 0.5 },
                        ]}
                        onPress={() => setCurrentCategory(category.id)}
                    >
                        <Text style={{ color: currentCategory === category.id ? '#fff' : "#000" }}>{category.name}</Text>
                    </TouchableOpacity>
                ))}
            </View>
            <ScrollView style={[styles.container, { backgroundColor: isNight ? '#000' : '#fff' }]}>
                {renderCategory()}
            </ScrollView>
            <FooterNavBar style={styles.footer} />
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: { paddingTop: 50, flex: 1, flexDirection: 'row' },
    container: { flex: 1, padding: 20 },
    sidebar: { width: 100, borderRightWidth: 1, paddingTop: 20 },
    categoryButton: { padding: 10, alignItems: 'center' },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
    input: { width: '100%', padding: 10, marginBottom: 15, borderWidth: 1, borderColor: '#ccc', borderRadius: 8 },
    helpText: { fontSize: 16, lineHeight: 22 },
    footer: { position: 'absolute', bottom: 0, width: '100%' },
    save: { backgroundColor: "#1993DF" }
});

export default Account;
