import React, {ReactNode} from 'react';
import {
  KeyboardTypeOptions,
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from 'react-native';
import {Input, InputContainer} from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';

type AutoCapitalizeOptions =
  | 'none'
  | 'sentences'
  | 'words'
  | 'characters'
  | undefined;

interface InputTextProps {
  icon: string;
  iconSize?: number;
  iconColor?: string;
  color?: string;
  placeholder?: string;
  placeholderTextColor?: string;
  selectionColor?: string;
  autoCapitalize?: AutoCapitalizeOptions;
  keyboardType?: KeyboardTypeOptions | undefined;
  autoFocus?: boolean;
  value: string;
  secureTextEntry?: boolean;
  onChangeText?: ((text: string) => void) | undefined;
}

export const InputText = ({
  icon,
  iconSize,
  iconColor,
  placeholder,
  placeholderTextColor,
  selectionColor,
  keyboardType,
  autoCapitalize,
  autoFocus,
  value,
  secureTextEntry,
  onChangeText,
}: InputTextProps) => {
  return (
    <InputContainer>
      <Icon name={icon} size={iconSize} color={iconColor} />
      <Input
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        selectionColor={selectionColor}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        value={value}
        onChangeText={onChangeText}
        autoFocus={autoFocus}
        secureTextEntry={secureTextEntry}
      />
    </InputContainer>
  );
};
