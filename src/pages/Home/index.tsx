import React from 'react';
import {
  Container,
  TopContainer,
  MiddleConteiner,
  IconUserContainer,
  Name,
  Title,
  ScrollMenu,
  TitleContainer,
} from './styles';
import {StatusBar} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {useNavigation} from '@react-navigation/native';
import {InitialContext} from '../../contexts/initialContext';
import {Button, FooterButton} from '../../components/Form';
import LottieView from 'lottie-react-native';

const AnimatedIcon = Animatable.createAnimatableComponent(Name);
interface ScreenNavigation {
  navigate: (screen: string) => string;
}

export const Home: React.FC = () => {
  const navigation = useNavigation<ScreenNavigation>();
  const initial = React.useContext(InitialContext);
  const user: {
    email?: string;
    name?: string;
    type?: string;
  } = initial.user;

  return (
    <>
      <Container>
        <TopContainer>
          <IconUserContainer>
            <LottieView
              source={require('../../global/Lottie-anims/User.json')}
              autoPlay
              loop={false}
              speed={0.35}
            />
          </IconUserContainer>
          <AnimatedIcon animation="zoomIn" useNativeDriver duration={1800}>
            Olá, {user.name}
          </AnimatedIcon>
        </TopContainer>
        <TitleContainer>
          <Title>MENU DE SELEÇÃO</Title>
        </TitleContainer>
        <ScrollMenu>
          <MiddleConteiner>
            {(user.type === 'admin' || user.type === 'super admin') && (
              <Button
                label={'APROVAÇÕES'}
                styleRadius={20}
                width={'70%'}
                onPress={() => navigation.navigate('Approved')}
              />
            )}
            <Button
              label={'USUÁRIO DO SISTEMA'}
              styleRadius={20}
              fontSize={20}
              width={'70%'}
              onPress={() => navigation.navigate('UserSystem')}
            />
            <Button
              label={'EMPRÉSTIMOS'}
              styleRadius={20}
              width={'70%'}
              onPress={() => navigation.navigate('Loan')}
            />
            <Button
              label={'CADASTRAR'}
              styleRadius={20}
              width={'70%'}
              onPress={() => navigation.navigate('Register')}
            />
            <Button
              label={'CONSULTAS'}
              styleRadius={20}
              width={'70%'}
              onPress={() => navigation.navigate('Query')}
            />
          </MiddleConteiner>
        </ScrollMenu>
        <FooterButton
          label="Logout"
          radius={20}
          onPress={() => navigation.navigate('SignIn')}
        />
      </Container>
    </>
  );
};
