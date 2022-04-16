import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.colors.bg};
  padding-left: 2px;
  padding-right: 2px;
`;
export const InputContainer = styled.View`
  height: 120px;
  width: 100%;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.colors.bg};
  padding-left: 2px;
  padding-right: 2px;
`;

export const Title = styled.Text`
  margin-top: 20px;
  font-size: 23px;
  font-weight: 600;
  color: ${props => props.theme.colors.titleColor};
  margin-bottom: 8px;
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
export const SubTitle = styled.Text`
  margin-top: 20px;
  font-size: 14px;
  font-weight: 600;
  text-align: center;
  font-style: italic;
  color: ${props => props.theme.colors.titleColor};
  margin-bottom: 8px;
`;

export const Itens = styled.Text`
  margin-top: 2px;
  font-size: 14px;
  font-weight: 600;
  text-align: center;
  font-style: italic;
  color: ${props => props.theme.colors.titleColor};
  margin-bottom: 8px;
`;

export const Line = styled.View`
  width: 1000px;
  height: 1px;
  background-color: ${props => props.theme.colors.primary};
  margin-bottom: 5px;
`;

export const ScrollMenu = styled.View`
  flex: 1;
  width: 100%;
  margin-bottom: 10px;
`;
export const ItensContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: flex-start;
  border-radius: 8px;
  padding-left: 14px;
  padding-top: 6px;
  padding-bottom: 6px;
  margin: 4px;
  background-color: ${props => props.theme.colors.translucid};
`;

export const LineItem = styled.View`
  width: 100%;
  height: 1px;
  background-color: ${props => props.theme.colors.secondary};
  margin-left: -6px;
  margin-bottom: 6px;
  margin-top: 4px;
`;
export const ViewRow = styled.View`
  flex-direction: row;
`;
export const ViewColumn = styled.View`
  flex: 1;
  flex-direction: column;
  align-items: flex-start;
`;
export const ViewCheck = styled.View`
  flex: 0.4;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const ViewButton = styled.View`
  height: 52px;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin-top: 5px;
`;
