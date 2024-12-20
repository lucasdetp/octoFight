import React, { useState, useEffect, useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { UserProvider, UserContext } from './providers/UserContext';
import FooterNavBar from './components/molecules/FooterNavbar';
import { LaunchBattle, Login, Register, Account, BattlePage, Deck } from './components/pages';
import { Home } from './components/templates';
import { useColorScheme } from 'react-native';
import { OctoThemeProvider } from './providers/OctoThemeProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SocketProvider } from './providers/SocketContext';
import { View, Text, StyleSheet } from 'react-native';
import { io } from 'socket.io-client';
import axios from 'axios';
import CheckBattle from './providers/CheckBattle';
import OfflineNotice from './components/OfflineNotice';
import * as pJson from './package.json';

const Stack = createStackNavigator();

export default function App() {
  const colorScheme = useColorScheme();

  return (
    <UserProvider>
      <OctoThemeProvider>

        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </OctoThemeProvider>
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
      const response = await axios.get(`${pJson.proxy}/api/user`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      setUserId(response.data.id);
    }
  };

  useEffect(() => {
    const socketInstance = io(`${pJson.proxy}:8000`);
    setSocket(socketInstance);
    return () => {
      socketInstance.disconnect();
    };
  }, []);
  console.log('userId:', userId);
  return (

    <UserProvider>
      <SocketProvider>
        <OctoThemeProvider>
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
        </OctoThemeProvider>
      </SocketProvider>
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
