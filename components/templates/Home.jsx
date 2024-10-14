import React from 'react';
import { SafeAreaView, ScrollView, Text } from 'react-native';
import FooterNavBar from '../molecules/FooterNavbar';
import { StatusBar } from 'expo-status-bar';

const Home = () => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar style="auto" />
            <ScrollView>
                <Text style={{ fontSize: 24 }}>Testtt</Text>
            </ScrollView>
            <FooterNavBar />
        </SafeAreaView>
    );
};

export default Home;
