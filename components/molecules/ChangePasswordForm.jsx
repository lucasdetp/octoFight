import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Container, Text } from '../atoms';

const ChangePasswordForm = ({ onSubmit }) => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = () => {
        if (newPassword === confirmPassword) {
            onSubmit(currentPassword, newPassword);
        } else {
            alert('New passwords do not match');
        }
    };

    return (
        <Container.BasicView style={styles.container}>
            <Text.Name style={styles.label}>Current Password</Text.Name>
            <Text.BasicTextInput
                style={styles.input}
                placeholder="Enter current password"
                value={currentPassword}
                onChangeText={setCurrentPassword}
                secureTextEntry
                placeholderTextColor="#999"
            />
            <Text.Name style={styles.label}>New Password</Text.Name>
            <Text.BasicTextInput
                style={styles.input}
                placeholder="Enter new password"
                value={newPassword}
                onChangeText={setNewPassword}
                secureTextEntry
                placeholderTextColor="#999"
            />
            <Text.Name style={styles.label}>Confirm New Password</Text.Name>
            <Text.BasicTextInput
                style={styles.input}
                placeholder="Confirm new password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
                placeholderTextColor="#999"
            />
            <Button.Button title="Change Password" onClick={handleSubmit} />
        </Container.BasicView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
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

export default ChangePasswordForm;