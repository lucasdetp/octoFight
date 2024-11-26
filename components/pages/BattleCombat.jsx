import React, { useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { resolveBattle } from '../axiosConfig';

const BattleCombat = ({ route }) => {
    const { battleId } = route.params;
    const [selectedRapper, setSelectedRapper] = useState(null);

    const rappers = [{ id: 1, name: 'Rapper 1' }, { id: 2, name: 'Rapper 2' }];

    const handleBattle = async () => {
        if (selectedRapper) {
            try {
                await resolveBattle(battleId, selectedRapper.id);
            } catch (error) {
                console.error("Erreur lors de la résolution du combat:", error);
            }
        } else {
            alert("Veuillez sélectionner un rappeur");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Choisissez votre rappeur pour le combat</Text>
            <FlatList
                data={rappers}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <Button
                        title={`Choisir ${item.name}`}
                        onPress={() => setSelectedRapper(item)}
                        color={selectedRapper?.id === item.id ? 'green' : 'blue'}
                    />
                )}
            />
            <Button title="Lancer le combat" onPress={handleBattle} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, alignItems: 'center' },
    header: { fontSize: 24, marginBottom: 20 },
});

export default BattleCombat;
