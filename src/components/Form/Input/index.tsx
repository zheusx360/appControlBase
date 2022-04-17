import React from 'react';
import {Container, InputField, Icons, Iconbutton} from './styles';

type Props = {
  placeholder?: string;
  width?: number | string;
  height?: number | string;
  secureTextEntry?: boolean;
  rightIcon?: boolean;
  iconName?: string;
  sizeIcon?: number;
  editable?: boolean;
  pressIcon?: () => void;
  onChangeText?: React.Dispatch<React.SetStateAction<string>>;
};

export const Input: React.FC<Props> = ({
  iconName = 'eye',
  rightIcon,
  width = '80%',
  height = 55,
  sizeIcon = 20,
  editable = true,
  pressIcon,
  ...props
}) => {
  const color = editable ? '#fff' : '#898';
  return (
    <Container style={{width: width, height: height, backgroundColor: color}}>
      <InputField editable={editable} {...props} />
      {rightIcon && (
        <Iconbutton onPress={pressIcon}>
          <Icons name={iconName} size={sizeIcon} />
        </Iconbutton>
      )}
    </Container>
  );
};
