import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { Container, Text } from '../../atoms';

const ImageNameRappeur = ({ rapper }) => {
    return (
        <Container.Text style={styles.content}>
            <Image source={{ uri: rapper.image_url }} style={styles.image} />
            <Text.Name content={rapper.name} />
        </Container.Text>
    );
};

const styles = StyleSheet.create({
    image: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
    },
    content: {
        alignItems: 'center',
    },
});

export default ImageNameRappeur;
