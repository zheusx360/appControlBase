import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.colors.bg};
`;

export const LogoContainer = styled.View`
  width: 88%;
`;

export const Title = styled.Text`
  font-size: 35px;
  font-weight: 800;
  color: ${props => props.theme.colors.titleColor};
  margin-bottom: 8px;
`;
