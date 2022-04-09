import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Feather';

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: ${props => props.theme.colors.input};
  border-radius: 8px;
  width: 80%;
  height: 55px;
  margin: 8px;
`;

export const InputField = styled.TextInput`
  width: 90%;
  height: 100%;
  font-size: 18px;
  font-weight: 600;
  padding-left: 18px;
`;

export const Icons = styled(Icon)`
  color: ${props => props.theme.colors.iconColor};
`;

export const Iconbutton = styled.TouchableOpacity`
  width: 10%;
  height: 100%;
  align-items: flex-start;
  justify-content: center;
`;
