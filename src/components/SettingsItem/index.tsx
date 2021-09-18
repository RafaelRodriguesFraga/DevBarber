import React from 'react';
import {NativeTouchEvent, NativeSyntheticEvent, GestureResponderEvent} from 'react-native';
import {
  ScrollViewContainer,
  SettingsInfo,
  SettingsTitle,
  SettingsSubtitle,
  SettingsButtonContainer,
} from './style';

type SettingsItemProps = {
  title: string;
  subtitle: string;
  disabled?: boolean
  onPress?: (event: GestureResponderEvent) => void;
};

const SettingsItem = ({title, subtitle, disabled, onPress}: SettingsItemProps) => {
  return (
    <ScrollViewContainer>
      <SettingsButtonContainer onPress={onPress} activeOpacity={0.7} disabled={disabled}>
        <SettingsInfo>
          <SettingsTitle>{title}</SettingsTitle>
          <SettingsSubtitle>{subtitle}</SettingsSubtitle>
        </SettingsInfo>
      </SettingsButtonContainer>
    </ScrollViewContainer>
  );
};

export default SettingsItem;
