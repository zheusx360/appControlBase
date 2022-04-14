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
  InfoNotItens,
} from './styles';
import {api} from '../../utils/api';
import {useNavigation} from '@react-navigation/native';
import {Button, FooterButton, Input} from '../../components/Form';
import LottieView from 'lottie-react-native';
import {InitialContext} from '../../contexts/initialContext';
import {Alert, FlatList} from 'react-native';
import moment from 'moment';

interface ScreenNavigation {
  navigate: (screen: string) => string;
}

export const Loan: React.FC = () => {
  const navigation = useNavigation<ScreenNavigation>();
  const [selectView, setSelectView] = useState('initial');
  const initial = React.useContext(InitialContext);
  const token = initial.token;
  const userName: {name?: string} = initial.user;

  const [register, setRegister] = useState('');
  const [monitor, setMonitor] = useState([]);
  const [monitorId, setMonitorId] = useState({});
  const [selectMonitor, setSelectMonitor] = useState(
    'Nenhum monitor selecionado',
  );
  const [selectMicro, setSelectMicro] = useState('Nenhum micro selecionado');
  const [micro, setMicro] = useState([]);
  const [microId, setMicroId] = useState({});

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

  const SaveSucess = () => {
    Message('Sucesso', 'Emprestimo efetuado com sucesso!');
    GetInitialValues();
    setRegister('');
    setSelectMicro('Nenhum micro selecionado');
    setSelectMonitor('Nenhum monitor selecionado');
    setMicroId('');
    setMonitorId('');
  };

  //Metodo que executa a função get
  const GetMethod = async (url, setMethod) => {
    await api
      .get(url, {headers: {'x-access-token': token}})
      .then(response => {
        setMethod(response.data);
        return response.data;
      })
      .catch(error =>
        Alert.alert('Atenção!', JSON.stringify(error.response.data.message), [
          {text: 'OK', onPress: () => {}},
        ]),
      );
  };

  //metodo que chama a função post
  const PostMethod = async (url, body) => {
    let retorno;
    await api
      .post(url, body, {headers: {'x-access-token': token}})
      .then(response => {
        retorno = true;
        console.log('POST: ', response.data);
        return response.data;
      })
      .catch(error => {
        Message('Atenção', error.response.data.message);
        retorno = false;
        return false;
      });
    return retorno;
  };

  //Metodo path para alterações nos itens (UPDATE)
  const PatchMethod = async (url, body) => {
    await api
      .patch(url, body, {headers: {'x-access-token': token}})
      .then(response => {
        return response.data;
      })
      .catch(error => {
        Message('Atenção', error.response.data.message);
        return false;
      });
  };

  //Método que realiza o empréstimo caso os dados fornecidos estejam de acordo
  const SendLoan = async () => {
    const pat: {patrimonio?: string; id?: string} = monitorId;
    const serv: {service?: string; id?: string} = microId;

    if (!register) {
      Message('Atenção', 'Número de registro do usuário deve ser informado!');
      return;
    }
    if (!monitorId && !microId) {
      Message(
        'Atenção',
        'Você deve selecionar um Monitor e/ou um Micro para realizar o empréstimo',
      );
      return;
    }

    const userReg = {registration: register};
    const userValidate = await PostMethod('/user/veryfy', userReg);

    if (userValidate) {
      const newData = moment().format('D MMMM YYYY, h:mm:ss a');

      const data = {
        user: register,
        patrimonio: pat.patrimonio || 'NA',
        monitorId: pat.id || 'NA',
        serviceTag: serv.service || 'NA',
        microId: serv.id || 'NA',
        date: newData,
        loanBy: userName.name,
      };

      PostMethod('/loan', data);

      const dataMonitor = {
        status: 'rent',
        userLoan: register,
        date: newData,
        loanBy: userName.name,
        loanFor: register,
      };
      const dataMicro = {
        status: 'rent',
        userLoan: register,
        date: newData,
        loanBy: userName.name,
        loanFor: register,
      };

      if (monitorId) {
        PatchMethod(`/monitor/${pat.patrimonio}`, dataMicro);
      }
      if (microId) {
        PatchMethod(`/micros/${serv.service}`, dataMonitor);
      }
      SaveSucess();
    }
  };

  //Metodo que chama o metodo get para monitor e micros
  const GetInitialValues = async () => {
    GetMethod('/monitor/available', setMonitor);
    GetMethod('/micros/available', setMicro);
  };

  //Variaveis que setam os valores escolhidos para monitores e micros
  const Monitor = (id, marca, modelo, patrimonio) => {
    setSelectMonitor(
      `Marca: ${marca} - Modelo: ${modelo} - Pat: ${patrimonio}`,
    );
    setMonitorId({patrimonio, id});
  };
  const Micro = (id, modelo, memoria, service) => {
    setSelectMicro(`Modelo: ${modelo} - Memória: ${memoria} - St: ${service}`);
    setMicroId({service, id});
  };

  const Message = (title, message) => {
    Alert.alert(title, message);
  };

  //Render das views----------------------

  //Render inicial com os botões de seleção
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
      <Button
        label="DEVOLUÇÃO"
        onPress={() => navigation.navigate('Devolutions')}
      />
    </>
  );

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
      <TextItens>Memória: {obj.memoria}</TextItens>
      <Button
        label="Selecionar"
        fontSize={14}
        width={85}
        heigth={38}
        onPress={() => Micro(obj._id, obj.model, obj.memoria, obj.serviceTag)}
      />
    </ContainerRender>
  );

  //Render da tela caso escolha Novo empréstimo
  const LoanView = () => (
    <>
      <Container>
        <SubTitle>Número de registro do usuário</SubTitle>
        <Input
          height={45}
          value={register}
          placeholder="Registro"
          onChangeText={v => setRegister(v)}
        />
        <Line />
        <RenderInfo>{selectMonitor}</RenderInfo>
      </Container>
      <ScrollMenu>
        <RenderInfo>
          {monitor.length > 1
            ? `${monitor.length}: Monitores disponiveis`
            : `${monitor.length}: Monitor disponível`}{' '}
        </RenderInfo>
        {monitor.length === 0 && (
          <InfoNotItens>Não existem monitores disponiveis</InfoNotItens>
        )}
        <FlatList
          data={monitor}
          keyExtractor={item => item._id}
          renderItem={({item}) => RenderMonitor(item)}
        />
      </ScrollMenu>
      <Line />
      <RenderInfo>{selectMicro}</RenderInfo>
      <ScrollMenu>
        <RenderInfo>
          {micro.length > 1
            ? `${micro.length}: Micros disponiveis`
            : `${micro.length}: Micro diponível`}
        </RenderInfo>
        {micro.length === 0 && (
          <InfoNotItens>Não existem micros disponiveis</InfoNotItens>
        )}
        <FlatList
          data={micro}
          keyExtractor={item => item._id}
          renderItem={({item}) => RenderMicro(item)}
        />
      </ScrollMenu>
      <Line />
      <Button label="EMPRESTAR" onPress={() => SendLoan()} />
    </>
  );
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
