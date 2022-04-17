import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.colors.bg};
`;

export const ScrollMenu = styled.View`
  flex: 1;
  width: 100%;
  margin-bottom: 10px;
`;

export const ItensContainer = styled.View`
  width: 98%;
  align-self: center;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  padding-top: 25px;
  padding-bottom: 2px;
  margin-bottom: 10px;
  background-color: ${props => props.theme.colors.translucid};
`;

export const LogoContainer = styled.View`
  width: 88%;
`;
export const InfoTitle = styled.Text`
  margin-top: 20px;
  font-size: 23px;
  font-weight: 600;
  padding: 4px;
  border-radius: 8px;
  color: ${props => props.theme.colors.white};
  background-color: ${props => props.theme.colors.translucidPink};
  margin-bottom: 8px;
`;

export const Title = styled.Text`
  font-size: 30px;
  font-weight: 800;
  margin-top: 4px;
  color: ${props => props.theme.colors.titleColor};
  margin-bottom: 8px;
`;
export const SubTitle = styled.Text`
  font-size: 14px;
  font-weight: 800;
  color: ${props => props.theme.colors.titleColor};
  margin-bottom: 8px;
  text-align: center;
  width: 80%;
  margin-top: 10px;
`;

export const Line = styled.View`
  width: 1000px;
  height: 1px;
  background-color: ${props => props.theme.colors.primary};
  margin-bottom: 5px;
`;
