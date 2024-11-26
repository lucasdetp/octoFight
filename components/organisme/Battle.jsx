import React, { useEffect, useState } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { Text } from '../atoms';

const Battle = ({ battleId }) => {
  const [status, setStatus] = useState('En attente');


  const handleAction = (action) => {
    // Logique pour lancer une action dans le combat
    console.log(`Action ${action} lancée`);
  };

  return (
    <View style={styles.container}>
      <Text.Name style={styles.header}>Statut du Combat: {status}</Text.Name>
      <Text.StatusMessage message={`Statut: ${status}`} type={status === 'En attente' ? 'error' : 'success'} />
      <Button title="Lancer une Action" onPress={() => handleAction('action')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, alignItems: 'center' },
  header: { fontSize: 24, marginBottom: 10 },
});

export default Battle;
