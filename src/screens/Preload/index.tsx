import React, {useContext, useEffect} from 'react';
import * as S from './styles';
import {Images} from '../../shared/images';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import * as Api from '../../services/auth.service';
import {UserContext} from '../../contexts/User/userContext';
import {UserTypes} from '../../contexts/User/userTypes';

const Preload = () => {
  const navigation = useNavigation();
  const {dispatch} = useContext(UserContext);

  const checkToken = async () => {
    const storagedToken = await AsyncStorage.getItem('token');

    if (storagedToken) {
      const response = await Api.checkToken(storagedToken);
      const {token} = response;
      const {avatar} = response.data;

      if (token) {
        await AsyncStorage.setItem('token', token);

        dispatch({
          type: UserTypes.SET_AVATAR,
          payload: {
            avatar,
          },
        });

        navigation.reset({routes: [{name: 'TabRoutes'}]});
      } else {
        navigation.navigate('Login');
      }
    } else {
      navigation.navigate('Login');
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <S.Container>
      <Images.BarberLogo width="100%" height="160" />
      <S.LoadingIcon size="large" color="#FFFFFF" />
    </S.Container>
  );
};

export default Preload;
