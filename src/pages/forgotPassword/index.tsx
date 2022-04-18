import React, {useState} from 'react';
import {Container, LogoContainer, Title, Middle, SubTitle} from './styles';
import * as Animatable from 'react-native-animatable';
import Logo from '../../global/images/inicial-quadros.svg';
import {useNavigation} from '@react-navigation/native';
import {FooterButton, Input, Button} from '../../components/Form';

const AnimatedIcon = Animatable.createAnimatableComponent(LogoContainer);
interface ScreenNavigation {
  navigate: (screen: string) => string;
}

export const ForgotPassword: React.FC = () => {
  const navigation = useNavigation<ScreenNavigation>();
  const [email, setEmail] = useState('');

  return (
    <>
      <Container>
        <Title>Esqueceu sua senha?</Title>
        <Middle>
          <SubTitle>Insira seu email</SubTitle>
          <Input
            placeholder={'Digite seu email'}
            height={41}
            pressIcon={() => {}}
            sizeIcon={24}
            onChangeText={value => setEmail(value)}
          />
          <Button label="ENVIAR" heigth={45} width={180} onPress={() => {}} />
        </Middle>
      </Container>
      <FooterButton
        label="VOLTAR"
        name="arrow-left"
        size={20}
        onPress={() => navigation.navigate('SignIn')}
      />
    </>
  );
};
