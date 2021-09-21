import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {BarberProps} from '../../models/props/barberProps';
import Stars from '../Stars';
import * as S from './styles';


type BarberItemProps = {
  user: BarberProps;
};

const BarberItem = ({user}: BarberItemProps) => {
  const navigation = useNavigation();

  const handleNavigateToProfile = () => {
    const {id, avatar, name, stars} = user;

    navigation.navigate('Profile', {
      id,
      avatar,
      name,
      stars,
    });
  };

  return (
    <S.ButtonContainer activeOpacity={0.7} onPress={handleNavigateToProfile}>
      <S.Avatar source={{uri: user.avatar}} />

      <S.UserInfoContainer>
        <S.Username>{user.name}</S.Username>

        <Stars rating={user.stars} showRatingNumber />

        <S.ProfileButton activeOpacity={0.7} onPress={handleNavigateToProfile}>
          <S.ProfileButtonText>Ver Perfil</S.ProfileButtonText>
        </S.ProfileButton>
      </S.UserInfoContainer>
    </S.ButtonContainer>
  );
};

export default BarberItem;
