import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const FooterIcon = ({ name, size = 24, color = '#000' }) => {
    return <MaterialCommunityIcons name={name} size={size} color={color} />;
};

export default FooterIcon;