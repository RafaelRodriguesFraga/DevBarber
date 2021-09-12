import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Button} from 'react-native';
import {logout} from '../../services/auth.service';
import {Container} from './style';

const Settings = () => {
  const navigation = useNavigation();

  const handleLogout = async () => {
    await logout();
    navigation.reset({
      routes: [{name: 'Login'}],
    });
  };

  return (
    <Container>
      <Button title="Logout" onPress={handleLogout} />
    </Container>
  );
};

export default Settings;
