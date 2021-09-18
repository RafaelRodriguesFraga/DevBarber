import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Button, Text, View} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {logout} from '../../services/auth.service';
import {
  BackButton,
  Container,
  HeaderContainer,
  HeaderText,
  SettingsItemContainer,
} from './style';
import BackIcon from '../../assets/back.svg';
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
    <Container>
      <HeaderContainer>
        <BackButton onPress={handleBackButton}>
          <BackIcon width="44" height="44" fill={Colors.white} />
        </BackButton>

        <HeaderText>Configurações</HeaderText>
      </HeaderContainer>

      <SettingsItemContainer>
        <SettingsItem title="Usuário" subtitle={storagedName.replace(/"/g,"")} disabled />
        <SettingsItem title="Email" subtitle={storagedEmail.replace(/"/g,"")} disabled />
        <SettingsItem title="Tema" subtitle="Tema do App" onPress={() => {}} />
        <SettingsItem
          title="Sair"
          subtitle="Sair do App"
          onPress={handleLogout}
        />
      </SettingsItemContainer>

    </Container>
  );
};

export default Settings;
