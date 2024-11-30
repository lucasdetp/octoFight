import React, { useState, useEffect, useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { UserProvider, UserContext } from './providers/UserContext';
import FooterNavBar from './components/molecules/FooterNavbar';
import { LaunchBattle, Login, Register, Account, BattlePage, Deck } from './components/pages';
import { Home } from './components/templates';
import { useColorScheme } from 'react-native';
import { ThemeProvider } from './providers/ThemeProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SocketProvider } from './providers/SocketContext';
import { View, Text, StyleSheet } from 'react-native';
import { io } from 'socket.io-client';
import axios from 'axios';
import CheckBattle from './providers/CheckBattle';
import OfflineNotice from './components/OfflineNotice';

const Stack = createStackNavigator();

export default function App() {
  const colorScheme = useColorScheme();

  return (
    <UserProvider>
      <ThemeProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </ThemeProvider>
    </UserProvider>
  );
}

const AppNavigator = () => {
  const { userId, userInfo, getUserInfo } = useContext(UserContext);
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
    const socketInstance = io('http://10.26.132.231:8000');
    setSocket(socketInstance);
    return () => {
      socketInstance.disconnect();
    };
  }, []);
  console.log('userId:', userId);
  return (

    <UserProvider>
      <ThemeProvider>
        <OfflineNotice />
        <CheckBattle userId={userId} refreshKey={refreshKey}>
          <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="LaunchBattle" component={LaunchBattle} />
            <Stack.Screen name="Account" component={Account} />
            <Stack.Screen name="Deck" component={Deck} />
            <Stack.Screen name="BattlePage">
              {props =>
                <BattlePage
                  {...props} userId={userId} socket={socket} userInfo={userInfo}
                />}
            </Stack.Screen>
          </Stack.Navigator>
        </CheckBattle>
      </ThemeProvider>
    </UserProvider>

  );
};

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
