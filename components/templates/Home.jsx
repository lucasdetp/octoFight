import React from 'react';
import { SafeAreaView, ScrollView, Text, View, StyleSheet } from 'react-native';
import FooterNavBar from '../molecules/FooterNavbar';
import { StatusBar } from 'expo-status-bar';
import NightSwitch from '../atoms/NightSwitch';
import { useTheme } from '../../providers/ThemeProvider';

const Home = () => {
    const { isNight } = useTheme();
    const themeStyles = {
        backgroundColor: isNight ? '#000000' : '#ffffff',
        color: isNight ? '#ffffff' : '#000000',
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: themeStyles.backgroundColor }]}>
            <StatusBar style={isNight ? 'light' : 'dark'} />
            <View style={styles.header}>
                <NightSwitch />
            </View>
            <ScrollView contentContainerStyle={{ padding: 16 }}>
                <Text style={[styles.text, { color: themeStyles.color }]}>Bienvenue sur l'accueil !</Text>
            </ScrollView>
            <FooterNavBar />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        padding: 10,
    },
    text: {
        fontSize: 24,
    },
});

export default Home;
