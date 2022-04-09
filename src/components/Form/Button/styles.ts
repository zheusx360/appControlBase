import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  margin: 25px;
  width: 80%;
  height: 58px;
  background-color: ${props => props.theme.colors.primary};
  border-radius: 8px;
  justify-content: center;
  align-items: center;
`;

export const Text = styled.Text`
  color: ${props => props.theme.colors.textButton};
  font-weight: 800;
`;
