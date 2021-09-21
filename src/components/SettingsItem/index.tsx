import React from 'react';
import {GestureResponderEvent} from 'react-native';
import * as S from './styles';

type SettingsItemProps = {
  title: string;
  subtitle: string;
  disabled?: boolean
  onPress?: (event: GestureResponderEvent) => void;
};

const SettingsItem = ({title, subtitle, disabled, onPress}: SettingsItemProps) => {
  return (
    <S.ScrollViewContainer>
      <S.SettingsButtonContainer onPress={onPress} activeOpacity={0.7} disabled={disabled}>
        <S.SettingsInfo>
          <S.SettingsTitle>{title}</S.SettingsTitle>
          <S.SettingsSubtitle>{subtitle}</S.SettingsSubtitle>
        </S.SettingsInfo>
      </S.SettingsButtonContainer>
    </S.ScrollViewContainer>
  );
};

export default SettingsItem;
