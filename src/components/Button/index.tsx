import React from 'react';
import * as S from './styles';
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
      <S.Button activeOpacity={activeOpacity} onPress={onPress}>
        <S.ButtonText>{buttonText}</S.ButtonText>
      </S.Button>   
  );
};
