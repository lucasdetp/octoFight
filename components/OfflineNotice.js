import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Animated, Platform, StatusBar } from 'react-native';
import NetInfo from '@react-native-community/netinfo';

const OfflineNotice = () => {
  const [isOffline, setIsOffline] = useState(false);
  const [topPosition] = useState(new Animated.Value(-100));

  const statusBarHeight = Platform.OS === 'ios' ? StatusBar.currentHeight || 70 : 0; 

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsOffline(!state.isConnected);
    });

    return () => unsubscribe(); 
  }, []);

  useEffect(() => {
    Animated.timing(topPosition, {
      toValue: isOffline ? statusBarHeight : -100, 
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isOffline, statusBarHeight]);

  if (!isOffline) return null; 

  return (
    <Animated.View style={[styles.banner, { transform: [{ translateY: topPosition }] }]}>
      <Text style={styles.text}>Vous êtes hors ligne</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  banner: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'red',
    padding: 10,
    zIndex: 1000,
  },
  text: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default OfflineNotice;
