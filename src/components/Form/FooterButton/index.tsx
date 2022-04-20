import React from 'react';
import {GestureResponderEvent} from 'react-native';
import {Container, Text, Icons} from './styles';

type Props = {
  label: string;
  name?: string;
  size?: number;
  radius?: number;
  onPress: (event: GestureResponderEvent) => void;
};

export const FooterButton: React.FC<Props> = ({
  label,
  name,
  size,
  radius,
  ...props
}) => {
  return (
    <Container
      style={{borderTopLeftRadius: radius, borderTopRightRadius: radius}}
      {...props}>
      <Icons name={name} size={size} />
      <Text>{label}</Text>
    </Container>
  );
};
