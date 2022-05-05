import React, {useState} from 'react';
import {Container, Title, IconView, Middle} from './styles';
import {ScrollView, KeyboardAvoidingView, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Input, Button, FooterButton} from '../../components/Form';
import LottieView from 'lottie-react-native';
import {api} from '../../utils/api';
import {validate} from 'react-email-validator';
import CircleLoading from '../../common/circleLoading';

interface ScreenNavigationProps {
  navigate: (secreen: string) => void;
}

export const SignUp = () => {
  const [secure, setSecure] = useState(true);
  const [secureConfirm, setSecureConfirm] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigation = useNavigation<ScreenNavigationProps>();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = async () => {
    if (confirmPassword !== password) {
      Alert.alert('Atenção', 'senha e confirmar senha devem ser iguais');
      return;
    }

    if (email === '' || name === '' || password === '') {
      Alert.alert('Atenção', 'Os campos devem ser preenchido!');
      return;
    }

    const validEmail = validate(email);
    if (!validEmail) {
      Alert.alert(
        'Atenção',
        'Email inválido, insira um email válido para criar sua conta. Exemplo: seuemail@email.com ',
      );
      return;
    }

    if (password.length < 6) {
      Alert.alert(
        'Atenção',
        'A senha deve conter no minimo seis (6) caracteres.',
      );
      return;
    }

    setIsLoading(true);

    const data = {
      email: email,
      name: name,
      password: password,
      type: 'user',
    };

    await api
      .post('/user-system', data)
      .then(response => {
        Alert.alert(
          'Usuário criado!',
          'Solicite a liberação do login ao administrador!',
          [{text: 'OK', onPress: () => navigation.navigate('SignIn')}],
        );
        setIsLoading(false);
        return response.data;
      })
      .catch(error =>
        Alert.alert('Atenção!', JSON.stringify(error.response.data.message), [
          {text: 'OK', onPress: () => {}},
        ]),
      );
    setIsLoading(true);
  };

  return (
    <KeyboardAvoidingView enabled style={{flex: 1}} behavior={'padding'}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{flex: 1}}>
        <Container>
          {isLoading ? (
            <Middle>
              <CircleLoading />
            </Middle>
          ) : (
            <>
              <IconView>
                <LottieView
                  source={require('../../global/Lottie-anims/LoginG.json')}
                  autoPlay={true}
                  speed={0.8}
                  loop={false}
                />
              </IconView>
              <Middle>
                <Title>CRIAR CONTA</Title>
                <Input
                  placeholder="nome"
                  secureTextEntry={false}
                  onChangeText={value => setName(value)}
                />
                <Input
                  placeholder="email"
                  secureTextEntry={false}
                  onChangeText={value => setEmail(value)}
                />
                <Input
                  placeholder="senha"
                  pressIcon={() => setSecure(!secure)}
                  rightIcon={true}
                  iconName={secure ? 'eye' : 'eye-off'}
                  secureTextEntry={secure}
                  onChangeText={value => setPassword(value)}
                />
                <Input
                  placeholder="confirmar senha"
                  pressIcon={() => setSecureConfirm(!secureConfirm)}
                  rightIcon={true}
                  iconName={secureConfirm ? 'eye' : 'eye-off'}
                  secureTextEntry={secureConfirm}
                  onChangeText={value => setConfirmPassword(value)}
                />
                <Button
                  radius={25}
                  onPress={() => handleSignUp()}
                  label={'CRIAR CONTA'}
                />
              </Middle>
            </>
          )}
        </Container>
      </ScrollView>
      <FooterButton
        onPress={() => navigation.navigate('SignIn')}
        name="arrow-left"
        size={20}
        label="Já tenho uma conta"
      />
    </KeyboardAvoidingView>
  );
};
