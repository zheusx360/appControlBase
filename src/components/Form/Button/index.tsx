import React from 'react';
import {GestureResponderEvent} from 'react-native';
import {Container, Text} from './styles';
import LottieView from 'lottie-react-native';

type Props = {
  label: string;
  marginTop?: number;
  width?: string | number;
  heigth?: string | number;
  fontSize?: number;
  loading?: boolean;
  sizeIconLoading?: number;
  onPress: (event: GestureResponderEvent) => void;
};

export const Button: React.FC<Props> = ({
  label,
  marginTop = 25,
  width = '80%',
  heigth = 58,
  fontSize = 22,
  loading = false,
  sizeIconLoading = 120,
  ...props
}) => {
  return (
    <Container
      {...props}
      style={{marginTop: marginTop, width: width, height: heigth}}>
      {(loading && (
        <LottieView
          source={require('../../../global/Lottie-anims/CircleLoading.json')}
          style={{width: sizeIconLoading, height: sizeIconLoading}}
          autoPlay={true}
        />
      )) ||
        (!loading && <Text style={{fontSize: fontSize}}>{label}</Text>)}
    </Container>
  );
};
