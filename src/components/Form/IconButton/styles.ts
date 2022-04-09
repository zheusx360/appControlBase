import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Feather';

export const Container = styled.TouchableOpacity`
  background-color: ${props => props.theme.colors.primary};
  justify-content: center;
  align-items: center;
`;

export const Icons = styled(Icon)``;

export const Text = styled.Text`
  font-weight: 400;
`;
