import React from 'react';
import {Container, LogoContainer} from './styles';
import * as Animatable from 'react-native-animatable';
import Logo from '../../global/images/inicial-quadros.svg';
import {useNavigation} from '@react-navigation/native';

const AnimatedIcon = Animatable.createAnimatableComponent(LogoContainer);
interface ScreenNavigation {
  navigate: (screen: string) => string;
}

export const Loan: React.FC = () => {
  const navigation = useNavigation<ScreenNavigation>();

  return (
    <Container>
      <AnimatedIcon animation="zoomIn" useNativeDriver duration={2500}>
        <Logo />
      </AnimatedIcon>
    </Container>
  );
};
