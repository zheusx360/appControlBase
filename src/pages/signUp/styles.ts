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
export const IconView = styled.View`
  width: 70px;
  height: 70px;
  margin-bottom: 10px;
`;
export const Middle = styled.View`
  width: 96%;
  height: 75%;
  justify-content: center;
  align-items: center;
  padding-top: 15px;
  padding-bottom: 15px;
  border-bottom-left-radius: 70px;
  border-top-right-radius: 70px;
  background-color: ${props => props.theme.colors.translucid};
`;
