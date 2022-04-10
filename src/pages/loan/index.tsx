import React, {useEffect, useState} from 'react';
import {
  Container,
  IconView,
  SubTitle,
  RenderInfo,
  ContainerRender,
  ScrollMenu,
  TextItens,
  Line,
} from './styles';
import {api} from '../../utils/api';
import {useNavigation} from '@react-navigation/native';
import {Button, FooterButton, Input} from '../../components/Form';
import LottieView from 'lottie-react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {InitialContext} from '../../contexts/initialContext';
import {Alert, FlatList, Text} from 'react-native';

interface ScreenNavigation {
  navigate: (screen: string) => string;
}

export const Loan: React.FC = () => {
  const navigation = useNavigation<ScreenNavigation>();
  const [selectView, setSelectView] = useState('initial');
  const initial = React.useContext(InitialContext);
  const token = initial.token;
  const theme = initial.darkTheme === 'dark' ? 'DARK' : 'LIGHT';
  DropDownPicker.setTheme(theme);

  //Variaveis do dropdown picker
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const [items, setItems] = useState([]);
  const [register, setRegister] = useState('');
  const [monitor, setMonitor] = useState();
  const [monitorId, setMonitorId] = useState();
  const [selectMonitor, setSelectMonitor] = useState(
    'Nenhum monitor selecionado',
  );
  const [selectMicro, setSelectMicro] = useState('Nenhum micro selecionado');
  const [micro, setMicro] = useState();
  const [microId, setMicroId] = useState();

  const BackButtom = () => {
    if (selectView !== 'initial') {
      setSelectView('initial');
    } else {
      navigation.navigate('Home');
    }
  };

  useEffect(() => {
    GetInitialValues();
  }, []);

  const GetInitialValues = async () => {
    await api
      .get('/monitor/available', {headers: {'x-access-token': token}})
      .then(response => {
        setMonitor(response.data);
        console.log('Monitor: ', response.data);
        return response.data;
      })
      .catch(error =>
        Alert.alert('Atenção!', JSON.stringify(error.response.data.message), [
          {text: 'OK', onPress: () => {}},
        ]),
      );
    await api
      .get('/micros/available', {headers: {'x-access-token': token}})
      .then(response => {
        setMicro(response.data);
        return response.data;
      })
      .catch(error =>
        Alert.alert('Atenção!', JSON.stringify(error.response.data.message), [
          {text: 'OK', onPress: () => {}},
        ]),
      );
  };

  const InitialView = () => (
    <>
      <IconView>
        <LottieView
          source={require('../../global/Lottie-anims/Computer.json')}
          loop={false}
          autoPlay
          speed={0.7}
        />
      </IconView>
      <Button label="NOVO EMPRÉSTIMO" onPress={() => setSelectView('loan')} />
      <Button label="DEVOLUÇÃO" onPress={() => {}} />
    </>
  );

  const Monitor = (id, marca, modelo, patrimonio) => {
    setSelectMonitor(
      `Marca: ${marca} - Modelo: ${modelo} - Pat: ${patrimonio}`,
    );
    setMonitorId(id);
  };
  const Micro = (id, modelo, memoria, service) => {
    setSelectMicro(`Modelo: ${modelo} - Memória: ${memoria} - St: ${service}`);
    setMicroId(id);
  };

  const RenderMonitor = obj => (
    <ContainerRender>
      <TextItens>Marca: {obj.marca}</TextItens>
      <TextItens>Modelo: {obj.model}</TextItens>
      <Button
        label="Selecionar"
        fontSize={14}
        width={85}
        heigth={38}
        onPress={() => Monitor(obj._id, obj.marca, obj.model, obj.patrimonio)}
      />
    </ContainerRender>
  );
  const RenderMicro = obj => (
    <ContainerRender>
      <TextItens>Modelo: {obj.model}</TextItens>
      <TextItens>Meória: {obj.memoria}</TextItens>
      <Button
        label="Selecionar"
        fontSize={14}
        width={85}
        heigth={38}
        onPress={() => Micro(obj._id, obj.model, obj.memoria, obj.serviceTag)}
      />
    </ContainerRender>
  );

  const LoanView = () => (
    <>
      <Container>
        <SubTitle>Número de registro do usuário</SubTitle>
        <Input
          height={45}
          placeholder="Registro"
          onChangeText={v => setRegister(v)}
        />
        <Line />
        <RenderInfo>{selectMonitor}</RenderInfo>
      </Container>
      <ScrollMenu>
        <RenderInfo>Monitores disponiveis</RenderInfo>
        <FlatList
          data={monitor}
          keyExtractor={item => item._id}
          renderItem={({item}) => RenderMonitor(item)}
        />
      </ScrollMenu>
      <Line />
      <RenderInfo>{selectMicro}</RenderInfo>
      <ScrollMenu>
        <RenderInfo>Micros disponiveis</RenderInfo>
        <FlatList
          data={micro}
          keyExtractor={item => item._id}
          renderItem={({item}) => RenderMicro(item)}
        />
      </ScrollMenu>
      <Line />
      <Button label="EMPRESTAR" onPress={() => {}} />
    </>
  );

  console.log('MONITOR: - ', monitor);
  console.log('PC: - ', micro);
  console.log('PC-ID: - ', microId);
  console.log('Monitor-ID: - ', monitorId);

  return (
    <>
      <Container>
        {(selectView === 'initial' && InitialView()) ||
          (selectView === 'loan' && LoanView())}
      </Container>
      <FooterButton
        name="arrow-left"
        size={20}
        label="Voltar"
        onPress={() => BackButtom()}
      />
    </>
  );
};
