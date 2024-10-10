import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Menu from './components/molecules/Menu';
import FooterNavBar from './components/molecules/Navbar/FooterNavbar';

const App = () => {
  const [menu, setMenu] = useState('home');

  const displayContent = () => {
    switch (menu) {
      case 'profile':
        return <Text>Profile Content</Text>;
      case 'home':
      default:
        return <Text>Home Content</Text>;
      case 'Account':
        return <Text>Account Content</Text>;
    }
  };

  return (
    <View style={styles.container}>
      <Menu
        onMenuChange={(slug) => setMenu(slug)}
        configs={[
          { displayName: 'Profile', slug: 'profile' },
          { displayName: 'Home', slug: 'home' },
          { displayName: 'Account', slug: 'Account' },
        ]}
      />
      <View>{displayContent()}</View>
      <FooterNavBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default App;