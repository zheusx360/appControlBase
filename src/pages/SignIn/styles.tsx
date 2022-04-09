import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.colors.bg};
`;

export const Title = styled.Text`
  font-size: 35px;
  font-weight: 800;
  color: ${props => props.theme.colors.titleColor};
  margin-bottom: 8px;
`;

export const ViewTop = styled.View`
  position: absolute;
  top: 2%;
  left: 85%;
  right: 0%;
`;
