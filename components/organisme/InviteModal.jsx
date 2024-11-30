import React, { useState } from 'react';
import { Modal, StyleSheet } from 'react-native';
import { sendInvite } from '../axiosConfig';
import axios from 'axios';
import * as pJson from '../../package.json';
import { Container, Text, Button } from '../atoms';

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
            const response = await axios.get(`${pJson.proxy}/api/user/by-username/${username}`);
            return response.data.id;
        } catch (error) {
            console.error('Erreur lors de la récupération de l\'ID de l\'utilisateur', error);
            return null;
        }
    };

    return (
        <Modal visible={visible} animationType="slide">
            <Container.BasicView style={styles.container}>
                <Text.Name style={styles.header}>Inviter un utilisateur à un combat</Text.Name>
                <Text.BasicTextInput
                    placeholder="Nom d'utilisateur à inviter"
                    value={username}
                    onChangeText={setUsername}
                    style={styles.input}
                />
                {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
                <Button.Button title="Inviter" onClick={handleInvite} />
                <Button.Button title="Annuler" onClick={onClose} />
            </Container.BasicView>
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
