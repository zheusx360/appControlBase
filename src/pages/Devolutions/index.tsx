import React, {cloneElement, useState} from 'react';
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

  const Search = value => {
    if (!value) {
      Message('Atenção', 'Insira algum dado para sua consulta');
    }
    GetMethod(`/loan/${register}`, setData);
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
                Alert.alert(
                  'Teste',
                  `Monitor: ${checkMonitor.includes(dataItens.patrimonio)}` +
                    ` Micro: ${checkMicro.includes(dataItens.serviceTag)}`,
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
          <FlatList
            data={data}
            renderItem={({item}) => RenderItem(item)}
            keyExtractor={item => item._id}
          />
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
