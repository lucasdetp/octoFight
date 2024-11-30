
import { StatusBar } from 'expo-status-bar';
import { Card } from '../organisme';
import { Container } from '../atoms';
import { FooterNavBar } from '../organisme';
import { Home } from '../templates';

import { NavigationContainer } from '@react-navigation/native';

const Battle = ({ rapper, rapper2, profilPlayer1 }) => {


  return (
    <Container.SafeAreaView style={{ flex: 1 }}>
      <StatusBar style="auto" />
        <Container.BasicScrollView>
          <Card.CardRappeur rapper={rapper} />
          <Card.CardRappeur rapper={rapper2} />
        </Container.BasicScrollView>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
        <FooterNavBar />
      </NavigationContainer><FooterNavBar />
    </Container.SafeAreaView>
  )
}

export default Battle;