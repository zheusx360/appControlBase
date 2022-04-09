import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  margin: 5px;
`;

export const Text = styled.Text`
  color: ${props => props.theme.colors.textButton};
  font-size: 16px;
`;
