import React from 'react';

const Spinner = ({ size = 30 }) => {
  const sizeStyle = `${size}px`;

  return (
    <div
      style={{ width: sizeStyle, height: sizeStyle }}
    />
  );
};

export default Spinner;