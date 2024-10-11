
import { StatusBar } from 'expo-status-bar';
import {  SafeAreaView, ScrollView } from 'react-native';
// import { Text } from '../atoms';
import { Profil, FooterNavBar } from '../molecules';
import { Card} from '../organisme';
import { ProfileHeader } from '../molecules/Profil';
const Battle = ({rapper, rapper2, profilPlayer1}) => { 


    return (
            <SafeAreaView style={{ flex: 1 }}>
          <StatusBar style="auto" /> 
            <ScrollView>
              <Card.CardRappeur rapper={rapper} />
              {/* <Text.Name>{profilPlayer1.name}</Text.Name> */}

              <Card.CardRappeur rapper={rapper2} />
            </ScrollView> 
            {/* <Profil.ProfileHeader user={{ name: "jul", email: "test@test.fr", photo: "https://i.scdn.co/image/ab6761610000e5ebe66ef18636bf25588abdd2ae" }} /> */}
          <FooterNavBar />
         </SafeAreaView>
        )
}

export default Battle;