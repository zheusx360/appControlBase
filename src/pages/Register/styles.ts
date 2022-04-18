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

export const ConteinerDrop = styled.View`
  width: 85%;
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
