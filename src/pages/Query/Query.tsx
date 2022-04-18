import React, {useState} from 'react';
import {
  Container,
  Title,
  ConteinerDrop,
  MiddleContainer,
  IconLottie,
  InfoTitle,
  ScrollMenu,
  ItensContainer,
  TxtItens,
} from './styles';
import {useNavigation} from '@react-navigation/native';
import {InitialContext} from '../../contexts/initialContext';
import {api} from '../../utils/api';
import {Alert, FlatList, Keyboard} from 'react-native';
import {Input, Button, FooterButton} from '../../components/Form';
import LottieView from 'lottie-react-native';
import RadioForm from 'react-native-simple-radio-button';

interface ScreenNavigationProps {
  navigate: (secreen: string) => void;
}

export const Query: React.FC = () => {
  const navigation = useNavigation<ScreenNavigationProps>();
  const initial = React.useContext(InitialContext);
  const token = initial.token;
  const permission: {type?: string; email?: string} = initial.user;
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [render, setRender] = useState();
  const [txtSearch, setTxtSearch] = useState('');

  //Variaveis de envio para a base de dados

  //Variaveis do RadioButtom
  const [items, setItems] = useState('Usuário');
  const radioItens = [
    {label: 'Usuário', value: 'Usuário', chave: 'Registro'},
    {label: 'Micro', value: 'Micro', chave: 'ServiceTag'},
    {label: 'Monitor', value: 'Monitor', chave: 'Patrimônio'},
  ];

  const SelectRender = value => {
    if (items === 'Usuário') {
      let name = value.name;
      let registration = value.registration;
      let sector = value.sector;

      const url = `/user/${value.registration}`;

      return (
        <>
          <ItensContainer>
            <TxtItens>Registro</TxtItens>
            <Input
              placeholder={value.registration}
              onChangeText={values => (registration = values)}
              height={46}
              editable={false}
            />
            <TxtItens>Nome</TxtItens>
            <Input
              placeholder={value.name}
              onChangeText={v => (name = v)}
              height={46}
            />
            <TxtItens>Setor</TxtItens>
            <Input
              placeholder={value.sector}
              height={46}
              onChangeText={v => (sector = v)}
            />
            <Button
              label={'SALVAR'}
              width={'45%'}
              heigth={38}
              fontSize={18}
              onPress={() => PatchMethod(url, {name, registration, sector})}
            />
            {permission.type === 'super admin' && (
              <Button
                label="DELETAR"
                width={'45%'}
                heigth={38}
                color={'rgba(255, 0, 20, 0.65)'}
                fontSize={18}
                marginTop={0}
                onPress={() => DeleteQuestion(url)}
              />
            )}
          </ItensContainer>
        </>
      );
    }
    if (items === 'Micro') {
      let serviceTag = value.serviceTag;
      let model = value.model;
      let memoria = value.memoria;
      let patrimonio = value.patrimonio;
      let status = value.status;

      const url = `/micros/${value.serviceTag}`;

      return (
        <>
          <ItensContainer>
            <TxtItens>Service Tag</TxtItens>
            <Input
              placeholder={value.serviceTag}
              onChangeText={v => (serviceTag = v)}
              height={46}
              editable={false}
            />
            <TxtItens>Modelo</TxtItens>
            <Input
              placeholder={value.model}
              height={46}
              onChangeText={v => (model = v)}
            />
            <TxtItens>Memória</TxtItens>
            <Input
              placeholder={value.memoria}
              height={46}
              onChangeText={v => (memoria = v)}
            />
            <TxtItens>Patrimônio</TxtItens>
            <Input
              placeholder={value.patrimonio}
              height={46}
              onChangeText={v => (patrimonio = v)}
            />
            <TxtItens>Status</TxtItens>
            <Input
              placeholder={value.status}
              height={46}
              onChangeText={v => (status = v)}
              editable={
                permission.type === 'admin' || permission.type === 'super admin'
              }
            />
            <Button
              label={'SALVAR'}
              width={'45%'}
              heigth={38}
              fontSize={18}
              onPress={() =>
                PatchMethod(url, {
                  serviceTag,
                  model,
                  memoria,
                  patrimonio,
                  status,
                })
              }
            />
            {permission.type === 'super admin' && (
              <Button
                label="DELETAR"
                width={'45%'}
                heigth={38}
                color={'rgba(255, 0, 20, 0.65)'}
                fontSize={18}
                marginTop={0}
                onPress={() => DeleteQuestion(url)}
              />
            )}
          </ItensContainer>
        </>
      );
    }
    if (items === 'Monitor') {
      let patrimonio = value.patrimonio;
      let marca = value.marca;
      let model = value.model;
      let status = value.status;

      const url = `/monitor/${value.patrimonio}`;

      return (
        <>
          <ItensContainer>
            <TxtItens>Patrimônio</TxtItens>
            <Input
              placeholder={value.patrimonio}
              onChangeText={v => (patrimonio = v)}
              height={46}
              editable={false}
            />
            <TxtItens>Marca</TxtItens>
            <Input
              placeholder={value.marca}
              height={46}
              onChangeText={v => (marca = v)}
            />
            <TxtItens>Modelo</TxtItens>
            <Input
              placeholder={value.model}
              height={46}
              onChangeText={v => (model = v)}
            />
            <TxtItens>Status</TxtItens>
            <Input
              placeholder={value.status}
              onChangeText={v => (status = v)}
              height={46}
              editable={
                permission.type === 'admin' || permission.type === 'super admin'
              }
            />
            <Button
              label={'SALVAR'}
              width={'45%'}
              heigth={38}
              fontSize={18}
              onPress={() =>
                PatchMethod(url, {patrimonio, marca, model, status})
              }
            />
            {permission.type === 'super admin' && (
              <Button
                label="DELETAR"
                width={'45%'}
                heigth={38}
                color={'rgba(255, 0, 20, 0.65)'}
                fontSize={18}
                marginTop={0}
                onPress={() => DeleteQuestion(url)}
              />
            )}
          </ItensContainer>
        </>
      );
    }
  };

  const Message = (title, message) => {
    Alert.alert(title, message);
  };

  //Metodo para salvar as alterações
  const PatchMethod = async (url, {...values}) => {
    setIsLoading(true);
    const body = values;
    await api
      .patch(url, body, {headers: {'x-access-token': token}})
      .then(response => {
        Message('Sucesso', response.data.message);
        GetMethod();
        setIsLoading(false);
        return response.data;
      })
      .catch(error => {
        Message('Erro!', error.response.data.message);
        setIsLoading(false);
      });
  };

  //Metodo que executa a função get
  const GetMethod = async () => {
    let url;
    if (items === 'Usuário') {
      url = txtSearch === '' ? '/user' : `/user/${txtSearch}`;
    }
    if (items === 'Micro') {
      url = txtSearch === '' ? '/micros' : `/micros/${txtSearch}`;
    }
    if (items === 'Monitor') {
      url = txtSearch === '' ? '/monitor' : `/monitor/${txtSearch}`;
    }

    console.log('URL', url);

    Keyboard.dismiss();
    await api
      .get(url, {headers: {'x-access-token': token}})
      .then(response => {
        console.log(response.data);
        setData(response.data);
        setIsLoading(false);
        return response.data;
      })
      .catch(error => {
        Alert.alert('Atenção!', JSON.stringify(error.response.data.message), [
          {text: 'OK', onPress: () => {}},
        ]);
        setIsLoading(false);
      });
  };

  const DeleteQuestion = url => {
    Alert.alert('Atenção!', 'Deseja realmente deletar esse dado?', [
      {text: 'SIM', onPress: () => DeleteMethod(url)},
      {text: 'NÃO', onPress: () => {}},
    ]);
  };

  const DeleteMethod = async url => {
    setIsLoading(true);
    await api
      .delete(url, {headers: {'x-access-token': token}})
      .then(response => {
        setIsLoading(false);
        Message('Sucesso', response.data.message);
        GetMethod();
        return response.data;
      })
      .catch(error => {
        Message('Erro!', error.response.data.message);
        setIsLoading(false);
      });
  };

  return (
    <>
      <Container>
        <Title>Selecione o que deseja consultar</Title>
        <ConteinerDrop>
          <RadioForm
            radio_props={radioItens}
            initial={0}
            onPress={value => {
              setItems(value);
              setData([]);
            }}
            formHorizontal={true}
            buttonColor={'#a519c2'}
            selectedButtonColor={'#d342ff'}
            labelColor={'#d7d7d7'}
            selectedLabelColor={'#fff'}
            buttonSize={15}
            labelStyle={{marginRight: 18, fontWeight: '700'}}
          />
        </ConteinerDrop>
        <Input
          placeholder={`Busca por ${
            radioItens[radioItens.findIndex(e => e.label === items)].chave
          }`}
          height={41}
          rightIcon={true}
          iconName={'search'}
          pressIcon={() => GetMethod()}
          sizeIcon={24}
          onChangeText={v => setTxtSearch(v)}
        />
        <MiddleContainer>
          {(data.length > 0 && (
            <ScrollMenu>
              <FlatList
                data={data}
                renderItem={({item}) => SelectRender(item)}
                keyExtractor={item => item._id}
              />
            </ScrollMenu>
          )) || (
            <>
              <LottieView
                source={require('../../global/Lottie-anims/ListaVazia.json')}
                autoPlay={true}
                loop={false}
              />
              <InfoTitle>Nenhum item encontrado</InfoTitle>
            </>
          )}
        </MiddleContainer>
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
