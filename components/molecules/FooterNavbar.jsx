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
            {config.map((item, index) => {
                return <IconButton key={index} {...item} />
            })}
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
