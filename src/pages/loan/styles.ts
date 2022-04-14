import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.colors.bg};
  padding-left: 2px;
  padding-right: 2px;
`;

export const LogoContainer = styled.View`
  width: 88%;
`;

export const IconView = styled.View`
  width: 100%;
  height: 180px;
`;

export const ConteinerDrop = styled.View`
  width: 85%;
`;

export const Title = styled.Text`
  margin-top: 20px;
  font-size: 23px;
  font-weight: 600;
  color: ${props => props.theme.colors.titleColor};
  margin-bottom: 8px;
`;
export const SubTitle = styled.Text`
  margin-top: 20px;
  font-size: 18px;
  font-weight: 600;
  font-style: italic;
  color: ${props => props.theme.colors.titleColor};
  margin-bottom: 8px;
`;
export const RenderInfo = styled.Text`
  margin-top: 2px;
  font-size: 16px;
  font-weight: 600;
  font-style: italic;
  color: ${props => props.theme.colors.titleColor};
  margin-bottom: 8px;
  align-self: center;
`;
export const InfoNotItens = styled.Text`
  margin-top: 2px;
  font-size: 16px;
  font-weight: 600;
  font-style: italic;
  color: ${props => props.theme.colors.titleColor};
  margin-top: 25px;
  align-self: center;
  padding: 8px;
  border-top-right-radius: 10px;
  border-bottom-left-radius: 10px;
  background-color: ${props => props.theme.colors.primary};
`;

export const ContainerRender = styled.View`
  width: 85%;
  height: 130px;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  align-self: center;
  background-color: ${props => props.theme.colors.translucid};
  padding-top: 10px;
  margin-bottom: 2px;
`;
export const ScrollMenu = styled.View`
  flex: 1;
  width: 100%;
  margin-bottom: 10px;
`;
export const TextItens = styled.Text`
  font-size: 14px;
  color: ${props => props.theme.colors.titleColor};
`;

export const Line = styled.View`
  width: 1000px;
  height: 1px;
  background-color: ${props => props.theme.colors.primary};
  margin-bottom: 5px;
`;
