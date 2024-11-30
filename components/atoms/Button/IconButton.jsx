import styled from 'styled-components/native';
import { ThemeContext } from 'styled-components';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useContext } from 'react';

const StyledTocuhableOpacity = styled.TouchableOpacity`
    background-color: ${({ theme }) => theme.primary};
`;


export const IconButton = ({ navigate, name }) => {
    const navigation = useNavigation();
    const theme = useContext(ThemeContext)
    return <StyledTocuhableOpacity onPress={() => navigation.navigate(navigate)}>
        <MaterialCommunityIcons name={name} size={34} color={theme.icon} />
    </StyledTocuhableOpacity>
}