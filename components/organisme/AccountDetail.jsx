import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import ProfileInfoCard from '../molecules/ProfileInfoCard';
import Button from '../atoms/Button/Button';

const AccountDetails = ({ user, onLogout, onUpdate, onChangePassword }) => {
    const [showPasswordFields, setShowPasswordFields] = useState(false);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handlePasswordClick = () => {
        setShowPasswordFields(!showPasswordFields);
    };

    return (
        <View style={styles.container}>
            <ProfileInfoCard name={user.name} email={user.email} onLogout={onLogout} />
            <Button title="Mettre à jour les informations" onClick={onUpdate} />
            <Button title="Changer le mot de passe" onClick={handlePasswordClick} />

            {showPasswordFields && (
                <View style={styles.passwordContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Mot de passe actuel"
                        value={currentPassword}
                        onChangeText={setCurrentPassword}
                        secureTextEntry
                        placeholderTextColor="#999"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Nouveau mot de passe"
                        value={newPassword}
                        onChangeText={setNewPassword}
                        secureTextEntry
                        placeholderTextColor="#999"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Confirmer le nouveau mot de passe"
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        secureTextEntry
                        placeholderTextColor="#999"
                    />
                    <Button title="Valider le changement de mot de passe" onClick={() => onChangePassword(currentPassword, newPassword, confirmPassword)} />
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        alignItems: 'center',
    },
    passwordContainer: {
        marginTop: 20,
        width: '100%',
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

export default AccountDetails;