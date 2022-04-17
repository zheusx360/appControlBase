import React, {useState} from 'react';
import {Container, LogoContainer, Title} from './styles';
import {useNavigation} from '@react-navigation/native';
import {FooterButton} from '../../components/Form';
import {api} from '../../utils/api';
import {Alert} from 'react-native';
import {InitialContext} from '../../contexts/initialContext';

interface ScreenNavigation {
  navigate: (screen: string) => string;
}

const Message = (title, subtitle) => {
  Alert.alert(title, subtitle);
};

export const Query: React.FC = () => {
  const navigation = useNavigation<ScreenNavigation>();
  const [data, setData] = useState([]);
  const initial = React.useContext(InitialContext);
  const token = initial.token;

  const GetMethod = async (url, date) => {
    await api
      .get(url, {headers: {'x-access-token': token}})
      .then(response => {
        console.log(response.data);
        setData(response.data);
        return response.data;
      })
      .catch(error => Message('Atenção', error));
  };

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
