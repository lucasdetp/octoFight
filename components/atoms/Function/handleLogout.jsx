const handleLogout = async () => {
    try {
        const token = await AsyncStorage.getItem('authToken');

        if (!token) {
            console.error('No token found, skipping logout request');
            return;
        }

        const response = await api.post(
            `${pJson.proxy}/api/logout`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        console.log('Logout response:', response.data);

        await AsyncStorage.removeItem('authToken');
        await AsyncStorage.removeItem('id');
        console.log('Token removed successfully');

        setUser(null);
        setName('');
        setEmail('');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setShowPasswordFields(false);
        setIsLoggedIn(false);

        navigation.navigate('Login');
    } catch (error) {
        console.error('Error during logout:', error);
        Alert.alert('Erreur', 'Une erreur s\'est produite lors de la déconnexion.');
    }
};

export default handleLogout;