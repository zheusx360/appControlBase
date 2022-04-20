import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.colors.bg};
`;

export const TopContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-bottom-left-radius: 3px;
  border-bottom-right-radius: 3px;
  width: 100%;
  height: 60px;
  background-color: ${props => props.theme.colors.buttonFooter};
`;

export const MiddleConteiner = styled.View`
  flex: 1;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin-top: 6px;
`;
export const TitleContainer = styled.View`
  width: 100%;
  margin: 14px;
  justify-content: flex-end;
  align-items: center;
  margin-top: 18px;
`;

export const Title = styled.Text`
  font-size: 25px;
  font-weight: 800;
  font-style: italic;
  color: ${props => props.theme.colors.titleColor};
`;
export const Name = styled.Text`
  font-size: 20px;
  font-style: italic;
  font-weight: 600;
  color: ${props => props.theme.colors.titleColor};
`;

export const ScrollMenu = styled.ScrollView`
  flex: 1;
  width: 100%;
`;

export const IconUserContainer = styled.View`
  width: 55px;
  height: 55px;
`;
