import React, {useState} from 'react';
import {Container, Title, ConteinerDrop, MiddleContainer} from './styles';
import {useNavigation} from '@react-navigation/native';
import {InitialContext} from '../../contexts/initialContext';
import DropDownPicker from 'react-native-dropdown-picker';
import {api} from '../../utils/api';
import {Alert} from 'react-native';
import {Input, Button, FooterButton} from '../../components/Form';

interface ScreenNavigationProps {
  navigate: (secreen: string) => void;
}

export const Register: React.FC = () => {
  const navigation = useNavigation<ScreenNavigationProps>();
  const initial = React.useContext(InitialContext);
  const token = initial.token;
  const theme = initial.darkTheme === 'dark' ? 'DARK' : 'LIGHT';
  DropDownPicker.setTheme(theme);
  console.log('Token: ', token);
  //Variaveis de envio para a base de dados

  //----Usuário--------
  const [name, setName] = useState('');
  const [sector, setSector] = useState('');
  const [register, setRegister] = useState('');

  //----PC--------
  const [sTag, setStag] = useState('');
  const [modelPc, setModelPc] = useState('');
  const [memory, setMemory] = useState('');
  const [patrimonyPc, setpatrimonyPc] = useState('');

  //----Monitor--------
  const [patrimony, setPatrimony] = useState('');
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');

  //Variaveis do dropdown picker
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const [items, setItems] = useState([
    {label: 'Novo Usuário', value: 'USUÁRIO'},
    {label: 'Novo Computador', value: 'COMPUTADOR'},
    {label: 'Novo Monitor', value: 'MONITOR'},
  ]);

  //Variaveis que contem a montagem da tela conforme a seleção
  const User = () => (
    <>
      <Input placeholder="Nome" onChangeText={v => setName(v)} />
      <Input placeholder="Registro" onChangeText={v => setRegister(v)} />
      <Input placeholder="Setor" onChangeText={v => setSector(v)} />
      <Button
        label={`CADASTRAR ${value}`}
        width={'86%'}
        onPress={() => RegisterData('user')}
      />
    </>
  );

  const Pc = () => (
    <>
      <Input placeholder="Service Tag" onChangeText={v => setStag(v)} />
      <Input placeholder="Modelo" onChangeText={v => setModelPc(v)} />
      <Input placeholder="Memória" onChangeText={v => setMemory(v)} />
      <Input placeholder="Patrimonio" onChangeText={v => setpatrimonyPc(v)} />
      <Button
        label={`CADASTRAR ${value}`}
        width={'86%'}
        onPress={() => RegisterData('Pc')}
      />
    </>
  );
  const Monitor = () => (
    <>
      <Input placeholder="Patrimonio" onChangeText={v => setPatrimony(v)} />
      <Input placeholder="Marca" onChangeText={v => setBrand(v)} />
      <Input placeholder="Modelo" onChangeText={v => setModel(v)} />
      <Button
        label={`CADASTRAR ${value}`}
        width={'86%'}
        onPress={() => RegisterData('Monitor')}
      />
    </>
  );

  //Limpa os campos apos os dados serem inseridos na base de dados
  const clear = () => {
    const val = value;
    setValue('');
    setValue(val);
  };

  const Alerta = () => {
    Alert.alert('Atenção', 'Todos os campos devem ser preenchidos!');
  };

  const SaveData = async (data, route) => {
    await api
      .post(route, data, {headers: {'x-access-token': token}})
      .then(response => {
        Alert.alert('Dados inseridos!', 'Os dados foram salvos com sucesso!', [
          {text: 'OK', onPress: () => clear()},
        ]);
        return response.data;
      })
      .catch(error =>
        Alert.alert('Atenção!', JSON.stringify(error.response.data.message), [
          {text: 'OK', onPress: () => {}},
        ]),
      );
  };

  const RegisterData = type => {
    //Registro do usuário na base de dados
    if (type === 'user') {
      if (name === '' || sector === '' || register === '') {
        Alerta();
        return;
      }
      const data = {
        name: name,
        registration: register,
        sector: sector,
      };
      SaveData(data, '/user');
    }
    //Registro do Pc na base de dados
    if (type === 'Pc') {
      if (
        sTag === '' ||
        modelPc === '' ||
        memory === '' ||
        patrimonyPc === ''
      ) {
        Alerta();
        return;
      }
      const data = {
        serviceTag: sTag,
        model: model,
        memoria: memory,
        patrimonio: patrimonyPc,
        status: 'available',
      };
      SaveData(data, '/micros');
    }
    //Registro do Monitor na base de dados
    if (type === 'Monitor') {
      if (patrimony === '' || brand === '' || model === '') {
        Alerta();
        return;
      }
      const data = {
        patrimonio: patrimony,
        marca: brand,
        model: model,
        status: 'available',
      };
      SaveData(data, '/monitor');
    }
  };

  return (
    <>
      <Container>
        <Title>Selecione o que deseja cadastrar</Title>
        <ConteinerDrop>
          <DropDownPicker
            open={open}
            placeholder={'Selecione um item'}
            value={value}
            items={items}
            labelStyle={{fontWeight: 'bold'}}
            textStyle={{fontSize: 16}}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
          />
        </ConteinerDrop>
        <MiddleContainer>
          {(value === 'USUÁRIO' && User()) ||
            (value === 'COMPUTADOR' && Pc()) ||
            (value === 'MONITOR' && Monitor()) || (
              <Title>Nenhum item selecionado</Title>
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
