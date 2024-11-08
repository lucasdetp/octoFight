
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, ScrollView } from 'react-native';
import { Card } from '../organisme';

import { NavigationContainer } from '@react-navigation/native';

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