const getToken = async () => {
    try {
        const token = await AsyncStorage.getItem('token');
        return token;
    } catch (error) {
        console.error('Erreur lors de la récupération du token:', error);
        return null;
    }
};

const handleBuyRapper = async (rapperId) => {
    try {
        const token = await getToken();

        if (!token) {
            setMessage('Vous devez être connecté pour acheter un rappeur.');
            setMessageType('error');
            return;
        }

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        const response = await axios.post(
            `${pJson.proxy}/api/buy-rapper`,
            { rapper_id: String(rapperId) },
            config
        );

        if (response.status === 200) {
            setMessage('Vous avez acheté ce rappeur !');
            setMessageType('success');
            setRappers((prevRappers) =>
                prevRappers.filter((rapper) => rapper.id !== rapperId)
            );
        }
    } catch (error) {
        if (error.response && error.response.data && error.response.data.error) {
            setMessage(error.response.data.error);
        } else {
            setMessage("Une erreur est survenue lors de l'achat du rappeur.");
        }
        setMessageType('error');
    }
};

export default handleBuyRapper;