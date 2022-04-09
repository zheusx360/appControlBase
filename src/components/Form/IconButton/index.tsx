import React from 'react';
import {GestureResponderEvent} from 'react-native';
import {Container, Text, Icons} from './styles';

type Props = {
  name?: string;
  label?: string;
  size?: number;
  radius?: number;
  bgColor?: string;
  iconColor?: string;
  iconSize?: number;
  margin?: number;
  fontSize?: number;
  textColor?: string;
  onPress?: (event: GestureResponderEvent) => void;
};

export const IconButton: React.FC<Props> = ({
  name = 'sun',
  size = 25,
  bgColor = 'transparent',
  iconColor = 'white',
  iconSize = 15,
  margin = 0,
  label = '',
  fontSize = 13,
  radius = 2,
  textColor = '#000',
  ...props
}) => {
  return (
    <>
      <Container
        style={{
          width: size,
          height: size,
          borderRadius: radius,
          backgroundColor: bgColor,
          margin: margin,
        }}
        {...props}>
        <Icons name={name} size={iconSize} color={iconColor} />
      </Container>
      {label !== '' && (
        <Text
          style={{
            fontSize: fontSize,
            color: textColor,
          }}>
          {label}
        </Text>
      )}
    </>
  );
};
