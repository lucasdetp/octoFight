import React, { useState } from 'react';
import { Modal, View, Text, StyleSheet, Button, TextInput } from 'react-native';
import { sendInvite } from '../axiosConfig';
import axios from 'axios';

const InviteModal = ({ visible, onClose }) => {
    const [username, setUsername] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleInvite = async () => {
        try {
            const invitedUserId = await getUserIdByUsername(username);
            
            if (!invitedUserId) {
                setErrorMessage('Utilisateur non trouvé');
                return;
            }

            await sendInvite(invitedUserId); 
            onClose(); 
        } catch (error) {
            console.error('Erreur lors de l\'envoi de l\'invitation:', error);
            setErrorMessage('Erreur lors de l\'envoi de l\'invitation');
        }
    };

    const getUserIdByUsername = async (username) => {
        try {
            console.log('username', username);
            const response = await axios.get(`http://10.26.132.231:8000/api/user/by-username/${username}`);
            return response.data.id;
        } catch (error) {
            console.error('Erreur lors de la récupération de l\'ID de l\'utilisateur', error);
            return null;
        }
    };

    return (
        <Modal visible={visible} animationType="slide">
            <View style={styles.container}>
                <Text style={styles.header}>Inviter un utilisateur à un combat</Text>
                <TextInput
                    placeholder="Nom d'utilisateur a"
                    value={username}
                    onChangeText={setUsername}
                    style={styles.input}
                />
                {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
                <Button title="Inviter" onPress={handleInvite} />
                <Button title="Annuler" onPress={onClose} />
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', padding: 20 },
    header: { fontSize: 24, marginBottom: 20 },
    input: { borderColor: '#ccc', borderWidth: 1, padding: 10, marginBottom: 20 },
    error: { color: 'red', marginBottom: 10 },
});

export default InviteModal;
