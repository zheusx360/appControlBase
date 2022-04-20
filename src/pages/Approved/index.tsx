import React, {useEffect, useState} from 'react';
import {
  Container,
  Title,
  MiddleConteiner,
  TitleContainer,
  ItemView,
  ItemText,
  ItemContainer,
  Info,
  LoadContainer,
} from './styles';
import {useNavigation} from '@react-navigation/native';
import {api} from '../../utils/api';
import {InitialContext} from '../../contexts/initialContext';
import {Button, FooterButton} from '../../components/Form';
import {Alert, FlatList} from 'react-native';
import LottieView from 'lottie-react-native';

interface ScreenNavigation {
  navigate: (screen: string) => string;
}

export const Approved: React.FC = () => {
  const navigation = useNavigation<ScreenNavigation>();
  const initial = React.useContext(InitialContext);
  const [data, setData] = useState([]);
  const user: {email?: string} = initial.user;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    GetUsers();
  }, []);

  const GetUsers = async () => {
    await api
      .get(`/user-system/approve/${user.email}`, {
        headers: {'x-access-token': initial.token},
      })
      .then(response => {
        setData(response.data);
        setLoading(false);
        return response.data;
      })
      .catch(error => console.log(error));
  };

  //Na requisição via Axios os parametros são (url, body, header)
  //no caso como não tem um body na requisição enviei um '' vazio no seu lugar
  //com isso foi (url, '', headers) e funcionou corretamente o envio
  const approveUser = async email => {
    await api
      .patch(`/user-system/approved/${email}`, '', {
        headers: {'x-access-token': initial.token},
      })
      .then(response => {
        Alert.alert(
          'Usuário aprovado',
          `Usuário ${email} aprovado com sucesso.`,
        );
        GetUsers();
        return response.data;
      })
      .catch(error => console.log(error));
  };

  const renderItem = dataItem => {
    const userItem: {email: string} = dataItem;
    return (
      <ItemContainer>
        <ItemView>
          <ItemText>{userItem.email}</ItemText>
        </ItemView>
        <Button
          label="Aprovar"
          width={'25%'}
          heigth={50}
          fontSize={16}
          onPress={() => approveUser(userItem.email)}
        />
      </ItemContainer>
    );
  };

  return (
    <>
      <Container>
        <TitleContainer>
          <Title>Aprovações Pendentes</Title>
        </TitleContainer>
        {(loading && (
          <MiddleConteiner>
            <LoadContainer>
              <LottieView
                source={require('../../global/Lottie-anims/CircleLoading.json')}
                autoPlay={true}
              />
            </LoadContainer>
          </MiddleConteiner>
        )) || (
          <MiddleConteiner>
            {data.length === 0 ? (
              <>
                <LottieView
                  source={require('../../global/Lottie-anims/ListaVazia.json')}
                  autoPlay={true}
                  loop={false}
                />
                <Info>Não existem pendências para aprovação.</Info>
              </>
            ) : (
              <FlatList
                data={data}
                renderItem={obj => {
                  return renderItem(obj.item);
                }}
              />
            )}
          </MiddleConteiner>
        )}
      </Container>
      <FooterButton
        onPress={() => navigation.navigate('Home')}
        name="arrow-left"
        size={20}
        label="Voltar"
      />
    </>
  );
};
