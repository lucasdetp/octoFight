import React from 'react';
import { View, StyleSheet } from 'react-native';
import FooterIcon from '../atoms/Icons/FooterIcons';

const FooterNavBar = () => {
    return (
        <View style={styles.footerContainer}>
            <FooterIcon name="home" size={34} color="#000" />
            <FooterIcon name="cards" size={34} color="#000" />
            <FooterIcon name="account" size={34} color="#000" />
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