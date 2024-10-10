import React from 'react';
import { Image as RNImage } from 'react-native';

const Image = ({ src, style, alt }) => {
  return <RNImage source={src} style={style} alt={alt} />;
};

export default Image;
