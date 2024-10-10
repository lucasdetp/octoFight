import React from 'react';
import { Image as RNImage } from 'react-native';

const Image = ({ source, style }) => {
  return <RNImage source={source} style={style} />;
};

export default Image;
