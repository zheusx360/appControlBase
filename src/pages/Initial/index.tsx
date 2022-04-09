import React from 'react';
import {Container, LogoContainer} from './styles';
import * as Animatable from 'react-native-animatable';
import Logo from '../../global/images/inicial-quadros.svg';
import {useNavigation} from '@react-navigation/native';

const AnimatedIcon = Animatable.createAnimatableComponent(LogoContainer);
interface ScreenNavigation {
  navigate: (screen: string) => string;
}

export const Initial: React.FC = () => {
  const navigation = useNavigation<ScreenNavigation>();

  setTimeout(() => {
    navigation.navigate('SignIn');
  }, 4200);

  return (
    <Container>
      <AnimatedIcon animation="zoomIn" useNativeDriver duration={2500}>
        <Logo />
      </AnimatedIcon>
    </Container>
  );
};
