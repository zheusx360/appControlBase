import React from 'react';
import {Container, LogoContainer, Title} from './styles';
import * as Animatable from 'react-native-animatable';
import Logo from '../../global/images/inicial-quadros.svg';
import {useNavigation} from '@react-navigation/native';
import {FooterButton} from '../../components/Form';

const AnimatedIcon = Animatable.createAnimatableComponent(LogoContainer);
interface ScreenNavigation {
  navigate: (screen: string) => string;
}

export const Query: React.FC = () => {
  const navigation = useNavigation<ScreenNavigation>();

  return (
    <>
      <Container>
        <Title>Consultas</Title>
      </Container>
      <FooterButton
        name="arrow-left"
        size={20}
        label="Voltar"
        onPress={() => navigation.navigate('Home')}
      />
    </>
  );
};
