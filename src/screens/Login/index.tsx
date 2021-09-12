import React, {useContext, useState} from 'react';
import {View, Text, Alert} from 'react-native';
import {
  Container,
  InputContainer,
  SignInMessageButton,
  SignInMessageButtonText,
  SignInMessageButtonTextBold,
} from './styles';

import BarberLogo from '../../assets/barber.svg';
import {InputText} from '../../components/InputText';
import {InputButton} from '../../components/Button';
import {useNavigation} from '@react-navigation/native';
import {login} from '../../services/auth.service';
import {Auth} from '../../models/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserContext } from '../../contexts/User/userContext';
import { UserTypes } from '../../contexts/User/userTypes';
import { Colors } from '../../shared/colors';

const Login = () => {
  const {dispatch} = useContext(UserContext);

  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleNavigateToSignUp = () => {
    navigation.navigate('Register');
  };

  const handleAuthentication = async () => {
    const auth: Auth = {
      email: email,
      password: password
    }

    if (email != '' && password != '') {
      const response = await login(auth);

      const {token, avatar} = response.data; 

      if(token) {
          await AsyncStorage.setItem('token', token); 
          
          dispatch({
            type: UserTypes.SET_AVATAR,
            payload: {
              avatar,
            },
          });

          navigation.reset({routes: [{name: 'TabRoutes'}]});

      }else {
        alert("Email ou senha inválidos");
      }      
    } else {
      alert('Todos os campos são obrigatórios');
    }
  };

  return (
    <Container>
      <BarberLogo width="100%" height="120" />

      <InputContainer>
        <InputText
          icon="envelope"
          iconSize={22}
          iconColor={Colors.blue2}
          placeholder="Digite seu email"
          placeholderTextColor={Colors.blue2}
          selectionColor={Colors.blue2}
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={email => setEmail(email)}
          autoFocus
        />

        <InputText
          icon="lock"
          iconSize={30}
          iconColor={Colors.blue2}
          placeholder="Digite sua senha"
          placeholderTextColor={Colors.blue2}
          selectionColor={Colors.blue2}
          value={password}
          onChangeText={password => setPassword(password)}
          secureTextEntry
        />

        <InputButton buttonText="LOGIN" activeOpacity={0.7} onPress={handleAuthentication} />
      </InputContainer>

      <SignInMessageButton activeOpacity={0.5} onPress={handleNavigateToSignUp}>
        <SignInMessageButtonText>
          Ainda não possui uma conta?
        </SignInMessageButtonText>
        <SignInMessageButtonTextBold>Cadastre-se</SignInMessageButtonTextBold>
      </SignInMessageButton>
    </Container>
  );
};

export default Login;
