import React from 'react';
import {Container, InputField, Icons, Iconbutton} from './styles';

type Props = {
  placeholder?: string;
  secureTextEntry?: boolean;
  rightIcon?: boolean;
  iconName?: string;
  pressIcon?: () => void;
  onChangeText?: React.Dispatch<React.SetStateAction<string>>;
};

export const Input: React.FC<Props> = ({
  iconName = 'eye',
  rightIcon,
  pressIcon,
  ...props
}) => {
  return (
    <Container>
      <InputField {...props} />
      {rightIcon && (
        <Iconbutton onPress={pressIcon}>
          <Icons name={iconName} size={20} />
        </Iconbutton>
      )}
    </Container>
  );
};
