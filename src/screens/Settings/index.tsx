import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {logout} from '../../services/auth.service';
import * as S from "./styles";

import {Images} from "../../shared/images";
import SettingsItem from '../../components/SettingsItem';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Settings = () => {
  const navigation = useNavigation();
  const [storagedEmail, setStoragedEmail] = useState<string>('');
  const [storagedName, setStoragedName] = useState("");

  const getUserProperties = async () => {
    const email = await AsyncStorage.getItem('email');
    const name = await AsyncStorage.getItem('name');

    setStoragedEmail(email!);
    setStoragedName(name!);
  };

  useEffect(() => {
    getUserProperties();
  }, []);

  const handleLogout = async () => {
    await logout();
    await AsyncStorage.clear();

    navigation.reset({
      routes: [{name: 'Login'}],
    });

  };

  const handleBackButton = () => {
    navigation.goBack();
  };

  return (
    <S.Container>
      <S.HeaderContainer>
        <S.BackButton onPress={handleBackButton}>
          <Images.BackIcon width="44" height="44" fill={Colors.white} />
        </S.BackButton>

        <S.HeaderText>Configurações</S.HeaderText>
      </S.HeaderContainer>

      <S.SettingsItemContainer>
        <SettingsItem title="Usuário" subtitle={storagedName.replace(/"/g,"")} disabled />
        <SettingsItem title="Email" subtitle={storagedEmail.replace(/"/g,"")} disabled />
        <SettingsItem title="Tema" subtitle="Tema do App" onPress={() => {}} />
        <SettingsItem
          title="Sair"
          subtitle="Sair do App"
          onPress={handleLogout}
        />
      </S.SettingsItemContainer>

    </S.Container>
  );
};

export default Settings;
