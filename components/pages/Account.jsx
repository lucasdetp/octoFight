import React from 'react';
import { SafeAreaView, ScrollView, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import FooterNavBar from '../molecules/FooterNavbar';

const Account = () => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar style="auto" />
            <ScrollView>
                <Text style={{ fontSize: 24 }}>Bienvenue sur votre compte</Text>
            </ScrollView>
            <FooterNavBar />
        </SafeAreaView>
    );
};

export default Account;
