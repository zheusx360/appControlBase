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

export const IconView = styled.View`
  width: 80px;
  height: 80px;
`;

export const Middle = styled.View`
  width: 96%;
  height: 73%;
  justify-content: center;
  align-items: center;
  padding-top: 15px;
  padding-bottom: 15px;
  border-bottom-left-radius: 70px;
  border-top-right-radius: 70px;
  background-color: ${props => props.theme.colors.translucid};
`;
