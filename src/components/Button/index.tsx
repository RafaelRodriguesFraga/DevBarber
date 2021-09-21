import React from 'react';
import {Button, ButtonText} from './styles';

interface InputButtonProps { 
  buttonText: string,
  activeOpacity?: number;
  onPress?: (() => void) | undefined
}
export const InputButton = ({
  buttonText,
  activeOpacity,
  onPress
}: InputButtonProps) => {
  return (      
      <Button activeOpacity={activeOpacity} onPress={onPress}>
        <ButtonText>{buttonText}</ButtonText>
      </Button>   
  );
};
