import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Icons } from '../atoms';
import { useTheme } from '../../providers/ThemeProvider';

const FooterNavBar = () => {
    const { isNight } = useTheme();

    const navigation = useNavigation();

    return (
        <View style={[styles.footerContainer, { backgroundColor: isNight ? '#000000' : '#ffffff' }]}>
            <TouchableOpacity onPress={() => navigation.navigate('LaunchBattle')}>
                <Icons.FooterIcon name="cards" size={34} color={isNight ? '#ffffff' : '#000000'} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                <Icons.FooterIcon name="home" size={34} color={isNight ? '#ffffff' : '#000000'} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Account')}>
                <Icons.FooterIcon name="account" size={34} color={isNight ? '#ffffff' : '#000000'} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    footerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
        paddingVertical: 20,
        position: 'absolute',
        bottom: 0,
        backgroundColor: '#f0f0f0',
    },
});

export default FooterNavBar;
