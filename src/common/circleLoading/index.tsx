import React from 'react';
import LottieView from 'lottie-react-native';

const CircleLoading: React.FC = () => {
  return (
    <LottieView
      source={require('../../global/Lottie-anims/CircleLoading.json')}
      autoPlay={true}
      loop={true}
    />
  );
};

export default CircleLoading;
