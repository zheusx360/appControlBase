import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.colors.bg};
`;

export const Title = styled.Text`
  margin-top: 20px;
  font-size: 21px;
  font-weight: 600;
  color: ${props => props.theme.colors.titleColor};
  margin-bottom: 8px;
`;
export const TxtItens = styled.Text`
  margin-top: 5px;
  font-size: 14px;
  align-self: flex-start;
  padding-left: 52px;
  font-weight: 600;
  color: ${props => props.theme.colors.titleColor};
`;

export const ConteinerDrop = styled.View`
  width: 85%;
  justify-content: center;
  align-items: center;
`;

export const MiddleContainer = styled.View`
  flex: 1;
  margin-top: 5px;
  justify-content: center;
  align-items: center;
  margin-bottom: 4px;
  border-radius: 9px;
  width: 98%;
  background-color: ${props => props.theme.colors.translucid};
`;

export const IconLottie = styled.View`
  height: 100px;
  width: 100px;
  margin-bottom: 10px;
  border-radius: 12px;
`;
export const ScrollMenu = styled.View`
  flex: 1;
  width: 100%;
  margin-bottom: 10px;
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
