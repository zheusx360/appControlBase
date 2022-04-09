import React from 'react';
import {
  Container,
  AnimContainer,
  MiddleConteiner,
  Name,
  Title,
  ScrollMenu,
  TitleContainer,
} from './styles';
import {Alert} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {useNavigation} from '@react-navigation/native';
import {InitialContext} from '../../contexts/initialContext';
import {Button} from '../../components/Form';

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

  console.log('User: ', user.name);
  console.log('UserType: ', user.type);
  console.log(user.type === 'admin');

  return (
    <>
      <Container>
        <AnimContainer>
          <AnimatedIcon animation="zoomIn" useNativeDriver duration={2500}>
            Olá, {user.name}
          </AnimatedIcon>
        </AnimContainer>
        <TitleContainer>
          <Title>MENU DE SELEÇÃO</Title>
        </TitleContainer>
        <ScrollMenu>
          <MiddleConteiner>
            {(user.type === 'admin' || user.type === 'super admin') && (
              <>
                <Button
                  label={'APROVAÇÕES'}
                  width={'70%'}
                  onPress={() => navigation.navigate('Approved')}
                />
                <Button
                  label={'USUÁRIO DO SISTEMA'}
                  fontSize={20}
                  width={'70%'}
                  onPress={() =>
                    Alert.alert('Route', 'update Delete User System')
                  }
                />
              </>
            )}
            <Button
              label={'EMPRÉSTIMOS'}
              width={'70%'}
              onPress={() => navigation.navigate('Loan')}
            />
            <Button
              label={'CADASTRAR'}
              width={'70%'}
              onPress={() => navigation.navigate('Register')}
            />
            <Button
              label={'CONSULTAS'}
              width={'70%'}
              onPress={() => Alert.alert('Route', 'find Micro Monitor')}
            />
          </MiddleConteiner>
        </ScrollMenu>
      </Container>
    </>
  );
};
