import React, {useState} from 'react';
import {Container, Title, ViewTop, IconView, Middle} from './styles';
import {ScrollView, KeyboardAvoidingView, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {InitialContext} from '../../contexts/initialContext';
import {api} from '../../utils/api';
import {
  Input,
  TextButton,
  Button,
  FooterButton,
  IconButton,
} from '../../components/Form';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LottieView from 'lottie-react-native';

interface ScreenNavigationProps {
  navigate: (secreen: string) => void;
}

export const SignIn: React.FC = () => {
  const navigation = useNavigation<ScreenNavigationProps>();
  const initial = React.useContext(InitialContext);
  const [secure, setSecure] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [load, setLoad] = useState(false);

  const handlerLogin = () => {
    setLoad(true);
    const data = {
      email: email,
      password: password,
    };

    if (!email || !password) {
      Alert.alert('Atenção', 'email e senha devem ser informados!');
      setLoad(false);
      return;
    }

    api
      .post('/user-system/login', data)
      .then(response => {
        initial.setUser(response.data.userAuth);
        initial.setToken(response.data.token);
        navigation.navigate('Home');
        setEmail('');
        setPassword('');
        setTimeout(() => {
          setLoad(false);
        }, 200);
        return response.data;
      })
      .catch(error => {
        Alert.alert('Atenção', JSON.stringify(error.response.data.message)),
          setLoad(false);
      });
  };

  const switchSecure = () => {
    setSecure(!secure);
  };
  const switchTheme = () => {
    const value = initial.darkTheme === 'dark' ? 'light' : 'dark';
    initial.setTheme(value);
    AsyncStorage.setItem('@savedTheme', value);
  };

  return (
    <KeyboardAvoidingView enabled style={{flex: 1}} behavior={'padding'}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{flex: 1}}>
        <Container>
          <IconView>
            <LottieView
              source={require('../../global/Lottie-anims/LoginG.json')}
              autoPlay={true}
              speed={0.8}
              loop={false}
            />
          </IconView>
          <ViewTop>
            <IconButton
              iconSize={20}
              name={initial.darkTheme === 'dark' ? 'moon' : 'sun'}
              onPress={() => switchTheme()}
            />
          </ViewTop>
          <Middle>
            <Title>LOGIN</Title>
            <Input
              placeholder="e-mail"
              value={email}
              onChangeText={value => setEmail(value)}
            />
            <Input
              placeholder="senha"
              rightIcon={true}
              pressIcon={() => switchSecure()}
              iconName={secure ? 'eye' : 'eye-off'}
              value={password}
              secureTextEntry={secure}
              onChangeText={value => setPassword(value)}
            />
            <Button
              onPress={() => handlerLogin()}
              loading={load}
              marginTop={30}
              radius={25}
              label={'ACESSAR'}
            />
            <TextButton
              onPress={() => navigation.navigate('ForgotPassword')}
              label={'Esqueci a Senha'}
            />
          </Middle>
        </Container>
      </ScrollView>
      <FooterButton
        onPress={() => navigation.navigate('SignUp')}
        name="log-in"
        size={20}
        label="CRIAR CONTA"
      />
    </KeyboardAvoidingView>
  );
};
