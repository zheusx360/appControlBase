import React, {useState} from 'react';
import {FooterButton, Input} from '../../components/Form';
import {Container, Title, SubTitle, Line} from './styles';
import {useNavigation} from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import {InitialContext} from '../../contexts/initialContext';
import {Alert, FlatList} from 'react-native';
import moment from 'moment';
import {api} from '../../utils/api';

interface ScreenNavigation {
  navigate: (screen: string) => string;
}

export const Devolutions: React.FC = () => {
  const navigation = useNavigation<ScreenNavigation>();
  const initial = React.useContext(InitialContext);
  const token = initial.token;
  const [register, setRegister] = useState('');
  const [data, setData] = useState({});

  const Message = (title, subtitle) => {
    Alert.alert(title, subtitle);
  };

  //Metodo que executa a função get
  const GetMethod = async (url, setMethod) => {
    await api
      .get(url, {headers: {'x-access-token': token}})
      .then(response => {
        return response.data;
      })
      .catch(error =>
        Alert.alert('Atenção!', JSON.stringify(error.response.data.message), [
          {text: 'OK', onPress: () => {}},
        ]),
      );
  };

  const Search = value => {
    if (!value) {
      Message('Atenção', 'Insira algum dado para sua consulta');
    }
    GetMethod('/loan', register);
  };

  return (
    <>
      <Container>
        <Title>Devoluções</Title>
        <Line />
        <Container>
          <SubTitle>Consulte por Registro, Patrimonio ou Service Tag</SubTitle>
          <Input
            height={45}
            iconName={'search'}
            pressIcon={() => Search(register)}
            rightIcon={true}
            onChangeText={v => setRegister(v)}
            sizeIcon={22}
            placeholder={'Insira sua consulta'}
          />
        </Container>
      </Container>
      <FooterButton
        name="arrow-left"
        size={20}
        label="Voltar"
        onPress={() => navigation.navigate('Loan')}
      />
    </>
  );
};
