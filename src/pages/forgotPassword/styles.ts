import styled from 'styled-components/native';

interface Props {
  margin?: string;
}

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.colors.bg};
`;
export const IconView = styled.View`
  width: 300px;
  height: 155px;
  margin-top: -18%;
`;

export const LogoContainer = styled.View`
  width: 88%;
`;

export const Title = styled.Text`
  font-size: 25px;
  font-weight: 800;
  margin-top: 20px;
  color: ${props => props.theme.colors.titleColor};
  margin-bottom: 8px;
`;
export const SubTitle = styled.Text<Props>`
  font-size: 16px;
  font-weight: 800;
  text-align: center;
  margin: ${props => props.margin || '20px'};
  color: ${props => props.theme.colors.titleColor};
`;
export const Email = styled.Text`
  font-size: 18px;
  font-weight: 800;
  margin-top: 2px;
  color: ${props => props.theme.colors.titleColor};
`;

export const Middle = styled.View`
  flex: 1;
  width: 95%;
  justify-content: center;
  align-items: center;
  margin-bottom: 16px;
  margin-top: 5px;
  border-top-right-radius: 45px;
  border-bottom-left-radius: 45px;
  background-color: ${props => props.theme.colors.translucid};
`;
