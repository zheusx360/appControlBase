import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
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
export const SubTitle = styled.Text`
  margin-top: 20px;
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
