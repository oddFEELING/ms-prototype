import React from 'react';

const HandLoader = (props) => {
  const { height, width, loop } = props;

  // Animation styling
  const styles = {
    height,
    width,
  };
  return (
    <lottie-player
      src='https://assets2.lottiefiles.com/packages/lf20_szlepvdh.json'
      background='transparent'
      speed='.75'
      style={{ ...styles }}
      loop={loop}
      autoplay
    />
  );
};

export default HandLoader;
