import React from 'react';
import { StyleSheet } from 'react-native';


import { LaunchBattle } from './components/pages';
export default function App() {

  return (
    <LaunchBattle></LaunchBattle>







  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f00',
  },
  scrollViewContent: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  cardContainer: {
    width: '90%',
    alignItems: 'center',
  },
});
