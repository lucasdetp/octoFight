import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import FooterNavBar from './components/molecules/FooterNavbar';
import { LaunchBattle, Login, Register, Account } from './components/pages';
import { Home } from './components/templates';
import { NightThemeProvider } from './providers/NightThemeProvider';
import NightSwitch from './components/atoms/NightSwitch';



const Stack = createStackNavigator();

export default function App() {

  return (
    <NightThemeProvider>

      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="LaunchBattle" component={LaunchBattle} />
          <Stack.Screen name="Account" component={Account} />
        </Stack.Navigator>

        <FooterNavBar />
      </NavigationContainer>
    </NightThemeProvider>


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
