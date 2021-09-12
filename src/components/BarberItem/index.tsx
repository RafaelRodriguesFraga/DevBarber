import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {BarberProps} from '../../models/props/barberProps';
import Stars from '../Stars';

import {
  ButtonContainer,
  Avatar,
  UserInfoContainer,
  Username,
  ProfileButton,
  ProfileButtonText,
} from './styles';

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
    <ButtonContainer activeOpacity={0.7} onPress={handleNavigateToProfile}>
      <Avatar source={{uri: user.avatar}} />

      <UserInfoContainer>
        <Username>{user.name}</Username>

        <Stars rating={user.stars} showRatingNumber />

        <ProfileButton activeOpacity={0.7} onPress={handleNavigateToProfile}>
          <ProfileButtonText>Ver Perfil</ProfileButtonText>
        </ProfileButton>
      </UserInfoContainer>
    </ButtonContainer>
  );
};

export default BarberItem;
