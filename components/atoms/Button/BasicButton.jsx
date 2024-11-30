import React from 'react';
import { Button } from 'react-native';

const BasicButton = ({ title, onPress, color }) => {
    return (
        <Button 
            title={title} 
            onPress={onPress} 
            color={color || '#007BFF'} 
        />
    );
};

export default BasicButton;
