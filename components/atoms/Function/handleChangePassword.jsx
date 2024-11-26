const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
        Alert.alert('Erreur', 'Les nouveaux mots de passe ne correspondent pas.');
        return;
    }

    try {
        const token = await AsyncStorage.getItem('authToken');
        const response = await api.post(
            `${pJson.proxy}/api/user/change-password`,
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

export default handleChangePassword;