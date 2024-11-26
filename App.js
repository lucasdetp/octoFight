import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import FooterNavBar from './components/molecules/FooterNavbar';
import { LaunchBattle, Login, Register, Account, BattlePage } from './components/pages';
import { Home } from './components/templates';
import { useColorScheme } from 'react-native';
import { ThemeProvider } from './providers/ThemeProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { io } from 'socket.io-client';
import axios from 'axios';
import { SocketProvider } from './providers/SocketContext'; 
import CheckBattle from './providers/CheckBattle';
import OfflineNotice from './components/OfflineNotice';

const Stack = createStackNavigator();

export default function App() {
  const colorScheme = useColorScheme();
  const [userId, setUserId] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [battleId, setBattleId] = useState(null);
  const [socket, setSocket] = useState(null);

  const getUserIdFromStorage = async () => {
    const userToken = await AsyncStorage.getItem('token');
    if (userToken) {
      const response = await axios.get('http://10.26.132.231:8000/api/user', {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      setUserId(response.data.id);
    }
  };

  useEffect(() => {
    getUserIdFromStorage();
    
    const socketInstance = io('http://10.26.132.231:8000');
    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect(); 
    };
  }, []);
console.log('userId:', userId);
  return (
    <SocketProvider>
        <ThemeProvider>
          <NavigationContainer>
            <OfflineNotice />
            <CheckBattle userId={userId} refreshKey={refreshKey}>
              <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Register" component={Register} />
                <Stack.Screen name="LaunchBattle" component={LaunchBattle} />
                <Stack.Screen name="Account" component={Account} />
                  <Stack.Screen name="BattlePage">
                    {props => 
                      <BattlePage 
                        {...props} userId={userId} socket={socket} 
                        battleId={battleId} setBattleId={setBattleId} 
                      />}
                  </Stack.Screen>
              </Stack.Navigator>
              <FooterNavBar />
            </CheckBattle>
          </NavigationContainer>
        </ThemeProvider>
      </SocketProvider>
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
