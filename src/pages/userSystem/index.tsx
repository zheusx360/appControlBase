import React, {useEffect, useState} from 'react';
import {
  Container,
  Line,
  Title,
  ItensContainer,
  SubTitle,
  ScrollMenu,
  InfoTitle,
} from './styles';
import {useNavigation} from '@react-navigation/native';
import {FooterButton, Input, Button} from '../../components/Form';
import {api} from '../../utils/api';
import {Alert, FlatList, Keyboard, KeyboardAvoidingView} from 'react-native';
import {InitialContext} from '../../contexts/initialContext';
import LottieView from 'lottie-react-native';
import CircleLoading from '../../common/circleLoading';

interface ScreenNavigation {
  navigate: (screen: string) => string;
}

export const UserSystem: React.FC = () => {
  const navigation = useNavigation<ScreenNavigation>();
  const [data, setData] = useState([]);
  const [sigleUser, setSingleUser] = useState({});
  const initial = React.useContext(InitialContext);
  const [email, setEmail] = useState('');
  const token = initial.token;
  const permission: {type?: string; email?: string} = initial.user;
  const [isLoading, setIsLoading] = useState(false);

  const GetMethod = async date => {
    setIsLoading(true);
    Keyboard.dismiss();
    const url =
      date === ''
        ? `/user-system/${permission.email}`
        : `/user-system/single/${date}`;

    console.log(url);
    await api
      .get(url, {
        headers: {'x-access-token': token},
      })
      .then(response => {
        if (email !== '') {
          setData([]);
          setSingleUser(response.data);
        } else {
          setSingleUser({});
          setData(response.data);
        }
        setIsLoading(false);
        return response.data;
      })
      .catch(error => {
        Message('Nenhum resultado!', error.response.data.message), setData([]);
        setIsLoading(false);
      });
  };

  const DeleteMethod = async email => {
    setIsLoading(true);
    await api
      .delete(`/user-system/${email}`, {headers: {'x-access-token': token}})
      .then(response => {
        setIsLoading(false);
        Message('Sucesso', response.data.message);
        setData([]);
        setEmail('');
        console.log(response.data);
        return response.data;
      })
      .catch(error => {
        Message('Erro!', error.response.data.message);
        setIsLoading(false);
      });
  };

  const MessageDelete = (email, name) => {
    Alert.alert('Atenção', `Deseja realmente deletar ${name}?`, [
      {text: 'SIM', onPress: () => DeleteMethod(email)},
      {text: 'NÃO', onPress: () => ''},
    ]);
  };

  const SaveData = async (id, emails, name, type) => {
    Keyboard.dismiss();
    if (permission.type === 'user') {
      Message(
        'Acesso restrito',
        'Você não tem permissão para alterar usuários.',
      );
    }
    const body = {
      email: emails,
      name: name,
      type: type,
    };
    setIsLoading(true);
    await api
      .patch(`/user-system/${id}`, body, {headers: {'x-access-token': token}})
      .then(response => {
        setIsLoading(false);
        Message('Sucesso', response.data.message);
        GetMethod(email);
        console.log(response.data);
        return response.data;
      })
      .catch(error => {
        Message('Erro!', error.response.data.message);
        setIsLoading(false);
      });
  };

  const Message = (title, subtitle) => {
    Alert.alert(title, subtitle);
  };

  const InitialRender = () => (
    <>
      <Container>
        <LottieView
          source={require('../../global/Lottie-anims/ListaVazia.json')}
          autoPlay={true}
          loop={false}
        />
        <InfoTitle>Lista de usuários vazia</InfoTitle>
      </Container>
    </>
  );

  const RenderItem = dataValue => {
    let userEmail = dataValue.email;
    let userName = dataValue.name;
    let userType = dataValue.type;
    return (
      <>
        <ItensContainer>
          <Input
            height={42}
            width={'85%'}
            placeholder={dataValue.email}
            onChangeText={value => (userEmail = value)}
            editable={
              permission.type === 'admin' || permission.type === 'super admin'
            }
            pressIcon={() => {}}
          />
          <Input
            height={42}
            width={'85%'}
            placeholder={dataValue.name}
            onChangeText={value => (userName = value)}
            editable={
              permission.type === 'admin' || permission.type === 'super admin'
            }
            pressIcon={() => {}}
          />
          <Input
            height={42}
            width={'85%'}
            placeholder={dataValue.type}
            onChangeText={value => (userType = value)}
            editable={permission.type === 'super admin'}
            pressIcon={() => {}}
          />
          <Button
            label="SALVAR"
            width={160}
            fontSize={18}
            heigth={40}
            onPress={() =>
              SaveData(dataValue._id, userEmail, userName, userType)
            }
          />
          {permission.type === 'super admin' && (
            <Button
              label="DELETAR"
              width={160}
              color={'rgba(255, 0, 20, 0.65)'}
              fontSize={18}
              marginTop={0}
              heigth={40}
              onPress={() => MessageDelete(userEmail, userName)}
            />
          )}
        </ItensContainer>
      </>
    );
  };

  return (
    <>
      <Container>
        <Title>Usuários do sistema</Title>
        <Line />
        <SubTitle>
          Insira o email ou deixe em branco para trazer todos usuários
        </SubTitle>
        <Input
          height={45}
          iconName={'search'}
          rightIcon={true}
          placeholder="email"
          onChangeText={value => setEmail(value)}
          pressIcon={() => GetMethod(email)}
        />
        {isLoading === true ? (
          <ScrollMenu>
            <CircleLoading />
          </ScrollMenu>
        ) : (
          <ScrollMenu>
            {data.length === 0 && !Object.values(sigleUser).length && (
              <InitialRender />
            )}
            {data.length !== 0 && (
              <FlatList
                data={data}
                renderItem={({item}) => RenderItem(item)}
                keyExtractor={item => item._id}
              />
            )}
            {Object.values(sigleUser).length > 0 && RenderItem(sigleUser)}
          </ScrollMenu>
        )}
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
