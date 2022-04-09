import React from 'react';
import {GestureResponderEvent} from 'react-native';
import {Container, Text} from './styles';

type Props = {
  label: string;
  marginTop?: number;
  width?: string | number;
  heigth?: string | number;
  fontSize?: number;
  onPress: (event: GestureResponderEvent) => void;
};

export const Button: React.FC<Props> = ({
  label,
  marginTop = 25,
  width = '80%',
  heigth = 58,
  fontSize = 22,
  ...props
}) => {
  return (
    <Container
      {...props}
      style={{marginTop: marginTop, width: width, height: heigth}}>
      <Text style={{fontSize: fontSize}}>{label}</Text>
    </Container>
  );
};
