import React, {useState} from 'react';
import {Button, FooterButton, Input} from '../../components/Form';
import {
  Container,
  Title,
  SubTitle,
  Line,
  ScrollMenu,
  Itens,
  ItensContainer,
  InputContainer,
  LineItem,
  ViewRow,
  ViewColumn,
  ViewCheck,
  ViewButton,
  InfoTitle,
} from './styles';
import {useNavigation} from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import {InitialContext} from '../../contexts/initialContext';
import {Alert, FlatList} from 'react-native';
import moment from 'moment';
import {api} from '../../utils/api';
import {Loan} from '../../interfaces';
import CheckBox from '@react-native-community/checkbox';

interface ScreenNavigation {
  navigate: (screen: string) => string;
}

export const Devolutions: React.FC = () => {
  const navigation = useNavigation<ScreenNavigation>();
  const initial = React.useContext(InitialContext);
  const token = initial.token;
  const [register, setRegister] = useState('');
  const [data, setData] = useState<Loan[]>([]);
  const [checkMicro, setCheckedMicro] = useState<boolean[]>([]);
  const [checkMonitor, setCheckedMonitor] = useState<boolean[]>([]);
  const Message = (title, subtitle) => {
    Alert.alert(title, subtitle);
  };

  //Metodo que executa a função get
  const GetMethod = async (url, setMethod) => {
    await api
      .get<Loan[]>(url, {headers: {'x-access-token': token}})
      .then(response => {
        console.log(response.data);
        setMethod(response.data);
        return response.data;
      })
      .catch(error =>
        Alert.alert('Atenção!', JSON.stringify(error.response.data.message), [
          {text: 'OK', onPress: () => {}},
        ]),
      );
  };

  const PatchMethod = async (url, body) => {
    await api
      .patch<Loan[]>(url, body, {headers: {'x-access-token': token}})
      .then(response => {
        Alert.alert('Atenção!', response.data.message, [
          {text: 'OK', onPress: () => GetMethod(`/loan/${register}`, setData)},
        ]);
        return response.data;
      })
      .catch(error => Message('Erro!', error.response.data.message));
  };

  const Search = value => {
    if (!value) {
      Message('Atenção', 'Insira algum dado para sua consulta');
    }
    GetMethod(`/loan/${register}`, setData);
  };

  //Metodo de envio da devolução para a base de dados
  const SendLoan = (setMicro, setMonitor, Micro, Monitor, idLoan) => {
    //Verifica se algum item foi selecionado para a devolução
    let dataEnv = {};
    if (!setMicro && !setMonitor) {
      Message(
        'Atenção',
        'Deve selecionar um Micro ou Monitor para realizar a devolução',
      );
    }

    if (setMicro && !setMonitor) {
      if (Monitor === 'NA') {
        console.log('Fechar o empréstimo pois não tem Monitor(Devolvido)');
        dataEnv = {micro: Micro, monitor: 'NA', action: 'close'};
      } else {
        console.log('Devolver apenas o Micro empréstimo ainda em aberto');
        dataEnv = {micro: Micro, monitor: 'NA', action: 'open'};
      }
    }
    if (!setMicro && setMonitor) {
      if (Micro === 'NA') {
        console.log('Fechar o empréstimo pois não tem Micro(Devolvido)');
        dataEnv = {micro: 'NA', monitor: Monitor, action: 'close'};
      } else {
        console.log('Devolver apenas o Monitor empréstimo ainda em aberto');
        dataEnv = {micro: 'NA', monitor: Monitor, action: 'open'};
      }
    }
    if (setMicro && setMonitor) {
      console.log('Devolver os dois e fechar o empréstimo');
      dataEnv = {micro: Micro, monitor: Monitor, action: 'close'};
    }
    PatchMethod(`/loan/devolution/${idLoan}`, dataEnv);
  };

  //Metodo para receber os checkbox da flatList
  const OnPressButton = (id, setMethod, setItem) => {
    const newIds = [...setItem];
    const index = newIds.indexOf(id);
    if (index > -1) {
      newIds.splice(index, 1);
    } else {
      newIds.push(id);
    }
    setMethod(newIds);
    console.log(setItem.includes(id));
  };

  const InitialRender = () => (
    <>
      <Container>
        <LottieView
          source={require('../../global/Lottie-anims/ListaVazia.json')}
          autoPlay={true}
          loop={false}
        />
        <InfoTitle>Lista de empréstimo vazia</InfoTitle>
      </Container>
    </>
  );

  const RenderItem = dataItens => {
    return (
      <>
        <ItensContainer>
          <Itens>{`Emprestado por: ${dataItens.loanBy}`}</Itens>
          <Itens>{`Emprestado para: ${dataItens.userName}`}</Itens>
          <Itens>{`Registro: ${dataItens.user}`}</Itens>
          <LineItem />
          {dataItens.patrimonio !== 'NA' && (
            <>
              <ViewRow>
                <ViewColumn>
                  <Itens>{`Pat. Monitor: ${dataItens.patrimonio}`}</Itens>
                  <Itens>{`Pat. Monitor: ${dataItens.marcaMonitor}`}</Itens>
                  <Itens>{`Modelo do Monitor: ${dataItens.modelMonitor}`}</Itens>
                </ViewColumn>
                <ViewCheck>
                  <CheckBox
                    disabled={false}
                    value={checkMonitor.includes(dataItens.patrimonio)}
                    tintColors={{true: '#bd54ff', false: '#c557d3'}}
                    onValueChange={() =>
                      OnPressButton(
                        dataItens.patrimonio,
                        setCheckedMonitor,
                        checkMonitor,
                      )
                    }
                  />
                </ViewCheck>
              </ViewRow>
              <LineItem />
            </>
          )}
          {dataItens.serviceTag !== 'NA' && (
            <>
              <ViewRow>
                <ViewColumn>
                  <Itens>{`ServiceTag: ${dataItens.serviceTag}`}</Itens>
                  <Itens>{`Pat. Micro: ${dataItens.patrimonioPc}`}</Itens>
                  <Itens>{`Marca: ${dataItens.modelPc}`}</Itens>
                  <Itens>{`Memória: ${dataItens.memory}`}</Itens>
                </ViewColumn>
                <ViewCheck>
                  <CheckBox
                    disabled={false}
                    value={checkMicro.includes(dataItens.serviceTag)}
                    tintColors={{true: '#bd54ff', false: '#c557d3'}}
                    onValueChange={() =>
                      OnPressButton(
                        dataItens.serviceTag,
                        setCheckedMicro,
                        checkMicro,
                      )
                    }
                  />
                </ViewCheck>
              </ViewRow>
            </>
          )}
          <ViewButton>
            <Button
              label="DEVOLVER"
              onPress={() =>
                SendLoan(
                  checkMicro.includes(dataItens.serviceTag),
                  checkMonitor.includes(dataItens.patrimonio),
                  dataItens.serviceTag,
                  dataItens.patrimonio,
                  dataItens._id,
                )
              }
              width={100}
              heigth={35}
              fontSize={14}
            />
          </ViewButton>
        </ItensContainer>
      </>
    );
  };

  return (
    <>
      <Container>
        <Title>Devoluções</Title>
        <Line />
        <InputContainer>
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
        </InputContainer>
        <ScrollMenu>
          {data.length === 0 ? (
            <InitialRender />
          ) : (
            <FlatList
              data={data}
              renderItem={({item}) => RenderItem(item)}
              keyExtractor={item => item._id}
            />
          )}
        </ScrollMenu>
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
