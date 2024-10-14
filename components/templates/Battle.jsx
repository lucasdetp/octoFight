
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, ScrollView } from 'react-native';
// import { Text } from '../atoms';
import { Profil, FooterNavBar } from '../molecules';
import { Card } from '../organisme';
import { ProfileHeader } from '../molecules/Profil';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../templates';

const Battle = ({ rapper, rapper2, profilPlayer1 }) => {


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar style="auto" />
      <ScrollView>
        <Card.CardRappeur rapper={rapper} />

        <Card.CardRappeur rapper={rapper2} />
      </ScrollView>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
        <FooterNavBar />
      </NavigationContainer><FooterNavBar />
    </SafeAreaView>
  )
}

export default Battle;