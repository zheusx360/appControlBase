import React from 'react';
import {Container, InputField, Icons, Iconbutton} from './styles';

type Props = {
  placeholder?: string;
  width?: number | string;
  height?: number | string;
  secureTextEntry?: boolean;
  rightIcon?: boolean;
  iconName?: string;
  pressIcon?: () => void;
  onChangeText?: React.Dispatch<React.SetStateAction<string>>;
};

export const Input: React.FC<Props> = ({
  iconName = 'eye',
  rightIcon,
  width = '80%',
  height = 55,
  pressIcon,
  ...props
}) => {
  return (
    <Container style={{width: width, height: height}}>
      <InputField {...props} />
      {rightIcon && (
        <Iconbutton onPress={pressIcon}>
          <Icons name={iconName} size={20} />
        </Iconbutton>
      )}
    </Container>
  );
};
