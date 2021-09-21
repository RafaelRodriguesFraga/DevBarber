import React from 'react';
import {Colors} from '../../shared/colors';
import {Images} from '../../shared/images';
import * as S from './styles';

type BackButtonProps = {
  activeOpacity?: number;
  onPress: () => void;
};

const BackButton = ({activeOpacity, onPress}: BackButtonProps) => {
  return (
    <S.BackButton activeOpacity={activeOpacity} onPress={onPress}>
      <Images.BackIcon width="44" height="44" fill={Colors.white} />
    </S.BackButton>
  );
};

export default BackButton;
