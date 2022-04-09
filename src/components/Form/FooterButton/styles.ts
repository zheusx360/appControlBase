import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Feather';

export const Container = styled.TouchableOpacity`
  width: 100%;
  height: 48px;
  background-color: ${props => props.theme.colors.buttonFooter};
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

export const Icons = styled(Icon)`
  color: ${props => props.theme.colors.light};
`;

export const Text = styled.Text`
  color: ${props => props.theme.colors.textButton};
  font-size: 18px;
  font-weight: 800;
  margin-left: 16px;
`;
