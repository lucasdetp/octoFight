import React, { useContext } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../../providers/OctoThemeProvider';
import { IconButton } from '../atoms/Button/IconButton';


const FooterNavBar = () => {
    const { isNight } = useTheme();
    const config = [
        {
            navigate: 'LaunchBattle',
            name: 'cards'
        },
        {
            navigate: 'LaunchBattle',
            name: 'cards'
        },
        {
            navigate: 'Home',
            name: 'home'
        },

        {
            navigate: 'Account',
            name: 'account'
        },
    ]
    return (
        <View style={[styles.footerContainer, { backgroundColor: isNight ? '#000000' : '#ffffff' }]}>
            <TouchableOpacity onPress={() => navigation.navigate('LaunchBattle')}>
                <MaterialCommunityIcons name="cards" size={34} color={isNight ? '#ffffff' : '#000000'} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                <MaterialCommunityIcons name="home" size={34} color={isNight ? '#ffffff' : '#000000'} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Deck')}>
                <MaterialCommunityIcons name="cards-playing-outline" size={34} color={isNight ? '#ffffff' : '#000000'} />
            </TouchableOpacity>


            //{config.map((item, index) => {
              //  return <IconButton key={index} {...item} />
            // })}

        </View>
    );
};

const styles = StyleSheet.create({
    footerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
        paddingVertical: 30,
        position: 'absolute',
        bottom: 0,
        backgroundColor: '#f0f0f0',
    },
});

export default FooterNavBar;
