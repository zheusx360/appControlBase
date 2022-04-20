import React, {useState} from 'react';
import {Container, Title, Middle, SubTitle, Email, IconView} from './styles';
import {useNavigation} from '@react-navigation/native';
import {FooterButton, Input, Button} from '../../components/Form';
import {api} from '../../utils/api';
import {Alert, Keyboard} from 'react-native';
import CircleLoading from '../../common/circleLoading';
import LottieView from 'lottie-react-native';

interface ScreenNavigation {
  navigate: (screen: string) => string;
}
export const ForgotPassword: React.FC = () => {
  const navigation = useNavigation<ScreenNavigation>();
  const [email, setEmail] = useState('');
  const [state, setState] = useState('');
  const [code, setCode] = useState('');
  const [securePass, setSecurePass] = useState(true);
  const [txtPass, setTxtPass] = useState('');
  const [confirmPass, setConfirmPass] = useState(true);
  const [txtConfirmPass, setTxtConfirmPass] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [codePass, setCodePass] = useState('');

  const Message = (title, subtitle, method?) => {
    Alert.alert(title, subtitle, [
      {
        text: 'OK',
        onPress: () => {
          if (method === 'next') {
            setState(state === '' ? 'send' : 'reset');
          }
        },
      },
    ]);
  };

  const GetMethod = async () => {
    setIsLoading(true);
    if (!email) {
      Message('Atenção', 'Digite o email cadastrado em sua conta.');
      setIsLoading(false);
      return;
    }
    Keyboard.dismiss();
    console.log(`/user-system/send/${email}`);
    await api
      .get(`/user-system/send/${email}`)
      .then(response => {
        console.log(response.data);
        setIsLoading(false);
        Message(
          response.data.title || 'Email enviado',
          response.data.message,
          'next',
        );
        return response.data;
      })
      .catch(error => {
        Message('Email inválido.', error.response.data.message);
        setIsLoading(false);
      });
  };

  const Validate = async () => {
    setIsLoading(true);
    Keyboard.dismiss();
    if (code === '') {
      Message('Erro de registro', 'Código deve ser informado.');
      setIsLoading(false);
      return;
    }
    const body = {
      email: email,
      code: code,
    };
    await api
      .post('/user-system/verifycode', body)
      .then(response => {
        Message(response.data.title, response.data.message, 'next');
        setCodePass(response.data.codePass);
        setIsLoading(false);
        return;
      })
      .catch(error => {
        Message('Atenção', error.response.data.message);
        setIsLoading(false);
      });
  };

  const SavePassword = async () => {
    setIsLoading(true);
    Keyboard.dismiss();
    if (txtPass !== txtConfirmPass) {
      Message(
        'Erro de confirmação',
        'Senha e confirmar senha devem ser iguais.',
      );
      setIsLoading(false);
      return;
    }
    if (txtPass === '' || txtConfirmPass === '') {
      Message(
        'Erro de preenchimento',
        'Senha e confirmar senha devem ser informadas.',
      );
      setIsLoading(false);
      return;
    }

    const body = {
      password: txtPass,
      codeGen: codePass,
    };
    console.log(body);
    console.log(`user-system/changepass/${email}`);
    await api
      .patch(`user-system/changepass/${email}`, body)
      .then(response => {
        Message('Senha Alterada', response.data.message, 'next');
        setIsLoading(false);
        navigation.navigate('SignIn');
        return;
      })
      .catch(error => {
        Message('Erro!', error.response.data.message);
        setIsLoading(false);
      });
  };

  const Initial = () => (
    <>
      <IconView>
        <LottieView
          source={require('../../global/Lottie-anims/SendEmail.json')}
          autoPlay={true}
          loop={false}
        />
      </IconView>
      <SubTitle>Insira seu email</SubTitle>
      <Input
        placeholder={'Digite seu email'}
        height={41}
        sizeIcon={24}
        onChangeText={value => setEmail(value)}
      />
      <Button
        label="ENVIAR"
        heigth={45}
        width={180}
        onPress={() => GetMethod()}
      />
    </>
  );

  const Code = () => (
    <>
      <IconView>
        <LottieView
          source={require('../../global/Lottie-anims/Email.json')}
          autoPlay={true}
          loop={false}
        />
      </IconView>
      <SubTitle margin="6px">Código enviado para:</SubTitle>
      <Email>{email}</Email>
      <Input
        placeholder={'Digite o código'}
        height={41}
        sizeIcon={24}
        onChangeText={value => setCode(value)}
      />
      <Button
        label="VALIDAR"
        heigth={45}
        width={180}
        onPress={() => Validate()}
      />
    </>
  );

  const Reset = () => (
    <>
      <IconView>
        <LottieView
          source={require('../../global/Lottie-anims/password.json')}
          autoPlay={true}
          loop={false}
        />
      </IconView>
      <SubTitle margin="0px">Insira a nova senha</SubTitle>
      <Input
        placeholder="senha"
        pressIcon={() => setSecurePass(!securePass)}
        rightIcon={true}
        iconName={securePass ? 'eye' : 'eye-off'}
        secureTextEntry={securePass}
        onChangeText={value => setTxtPass(value)}
      />
      <SubTitle margin={'0px'}>Confirmar a nova senha</SubTitle>
      <Input
        placeholder="confirmar senha"
        pressIcon={() => setConfirmPass(!confirmPass)}
        rightIcon={true}
        iconName={confirmPass ? 'eye' : 'eye-off'}
        secureTextEntry={confirmPass}
        onChangeText={value => setTxtConfirmPass(value)}
      />
      <Button
        label="SALVAR"
        heigth={45}
        width={180}
        onPress={() => SavePassword()}
      />
    </>
  );

  return (
    <>
      <Container>
        <Title>Esqueceu sua senha?</Title>
        {isLoading ? (
          <Middle>
            <CircleLoading />
          </Middle>
        ) : (
          <Middle>
            {(state === '' && Initial()) ||
              (state === 'send' && Code()) ||
              (state === 'reset' && Reset())}
          </Middle>
        )}
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
