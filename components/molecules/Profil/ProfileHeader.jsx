import React from 'react';
import { StyleSheet } from 'react-native';
import { Container, Image, Text } from '../../atoms'; 

const ProfileHeader = ({ user }) => {
  return (
    <Container.Profil style={styles.container}>
      <Image.Image src={{ uri: user.photo }} style={styles.image} alt="Photo de profil" /> 
      <Container.Text style={styles.textContainer}>
        <Text.Name content={user.name} /> 
        <Text.Name content={user.email}  />
      </Container.Text>
    </Container.Profil>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 120,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  textContainer: {
    justifyContent: 'center',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: '#666',
  },
});

export default ProfileHeader;
