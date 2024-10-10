import React from 'react';

const Button = ({ title, onClick, style }) => {
  return (
    <button style={style} onClick={onClick}>
      {title}
    </button>
  );
};

export default Button;
