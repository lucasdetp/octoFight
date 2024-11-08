import React, { useContext } from 'react';
import { SafeAreaView, ScrollView, Text, View, StyleSheet } from 'react-native';
import FooterNavBar from '../molecules/FooterNavbar';
import { StatusBar } from 'expo-status-bar';
import NightSwitch from '../atoms/NightSwitch';
import { NightThemeProviderContext } from '../../providers/NightThemeProvider';

const Home = () => {
    const nightThemeContext = useContext(NightThemeProviderContext);
    const { isNight, toggleNightMode } = nightThemeContext;

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: isNight ? '#000' : '#fff' }]}>
            <StatusBar style="auto" />
            <View style={styles.header}>
                <NightSwitch onPress={toggleNightMode} isNight={isNight} />
            </View>
            <ScrollView>
                <Text style={[styles.text, { color: isNight ? '#fff' : '#000' }]}>
                    Testtt
                </Text>
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
