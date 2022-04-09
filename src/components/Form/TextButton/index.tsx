import React from 'react';
import {GestureResponderEvent} from 'react-native';
import {Container, Text} from './styles';

type Props = {
  label: string;
  onPress: (event: GestureResponderEvent) => void;
};

export const TextButton: React.FC<Props> = ({label, ...props}) => {
  return (
    <Container {...props}>
      <Text>{label}</Text>
    </Container>
  );
};
