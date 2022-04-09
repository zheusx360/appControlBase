import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.colors.bg};
`;

export const LogoContainer = styled.View`
  width: 88%;
`;

export const Title = styled.Text`
  font-size: 25px;
  font-weight: 800;
  font-style: italic;
  padding-bottom: 10px;
  color: ${props => props.theme.colors.titleColor};
`;

export const TitleContainer = styled.View`
  margin-top: 12px;
  width: 100%;
  justify-content: center;
  align-items: center;
  padding-bottom: 5px;
  border-bottom-width: 1px;
  border-color: ${props => props.theme.colors.titleColor};
`;

export const MiddleConteiner = styled.View`
  flex: 1;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin-top: 18px;
`;

export const ItemView = styled.View`
  flex-direction: row;
  width: 64%;
  justify-content: space-around;
  align-items: center;
  margin: 10px 0 10px 0;
  padding: 3px;
  height: 50px;
  border-radius: 6px;
  background-color: ${props => props.theme.colors.translucid};
`;
export const ItemText = styled.Text`
  font-size: 16.5px;
  font-style: italic;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
`;

export const ItemContainer = styled.View`
  flex-direction: row;
  width: 100%;
  justify-content: center;
  align-items: center;
  padding-left: 10px;
  padding-right: 3px;
`;

export const Info = styled.Text`
  font-size: 22px;
  font-weight: 800;
  font-style: italic;
  text-align: center;
  padding-bottom: 10px;
  color: ${props => props.theme.colors.titleColor};
`;
