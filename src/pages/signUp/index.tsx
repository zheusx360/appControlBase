import React, {useState} from 'react';
import {Container, Title} from './styles';
import {ScrollView, KeyboardAvoidingView, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Input, Button, FooterButton} from '../../components/Form';
import {api} from '../../utils/api';
interface ScreenNavigationProps {
  navigate: (secreen: string) => void;
}

export const SignUp = () => {
  const [secure, setSecure] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigation = useNavigation<ScreenNavigationProps>();

  const handleSignUp = async () => {
    if (confirmPassword !== password) {
      Alert.alert('Atenção', 'senha e confirmar senha devem ser iguais');
      return;
    }

    if (email === '' || name === '' || password === '') {
      Alert.alert('Atenção', 'Os campos devem ser preenchido!');
      return;
    }

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
        return response.data;
      })
      .catch(error =>
        Alert.alert('Atenção!', JSON.stringify(error.response.data.message), [
          {text: 'OK', onPress: () => {}},
        ]),
      );
  };

  const switchSecure = () => {
    setSecure(!secure);
  };
  return (
    <KeyboardAvoidingView enabled style={{flex: 1}} behavior={'padding'}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{flex: 1}}>
        <Container>
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
            pressIcon={() => switchSecure()}
            rightIcon={true}
            iconName={secure ? 'eye' : 'eye-off'}
            secureTextEntry={secure}
            onChangeText={value => setPassword(value)}
          />
          <Input
            placeholder="confirmar senha"
            pressIcon={() => switchSecure()}
            rightIcon={true}
            iconName={secure ? 'eye' : 'eye-off'}
            secureTextEntry={secure}
            onChangeText={value => setConfirmPassword(value)}
          />
          <Button onPress={() => handleSignUp()} label={'CRIAR CONTA'} />
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
