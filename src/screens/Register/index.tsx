import React, {useState} from 'react';
import * as S from "./styles";
import {Images} from "../../shared/images";
import {InputText} from '../../components/InputText';
import {InputButton} from '../../components/Button';
import {useNavigation} from '@react-navigation/native';
import {Register as RegisterUser} from '../../models/register';
import {register} from '../../services/auth.service';
import {Colors} from '../../shared/colors';

const Register = () => {
  const navigation = useNavigation();

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleNavigateToSignIn = () => {
    navigation.navigate('Login');
  };

  const handleRegister = async () => {
    const registerBody: RegisterUser = {
      name,
      email,
      password,
    };

    if (name != '' || (email != '' && password != '')) {
      const response = await register(registerBody);

      const {token} = response.data;

      if (token) {
        alert('Cadastrado com sucesso');
        
        navigation.navigate('Login');
      } else {
        alert('Erro ao cadastrar');
      }
    } else {
      alert('Todos os campos são obrigatórios');
    }
  };

  return (
    <S.Container>
      <Images.BarberLogo width="100%" height="120" />

      <S.InputContainer>
        <InputText
          icon="user"
          iconSize={22}
          iconColor={Colors.blue2}
          placeholder="Digite seu nome"
          placeholderTextColor={Colors.blue2}
          selectionColor={Colors.blue2}
          keyboardType="email-address"
          autoCapitalize="none"
          value={name}
          onChangeText={name => setName(name)}
        />

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

        <InputButton
          buttonText="CADASTRAR"
          activeOpacity={0.7}
          onPress={handleRegister}
        />
      </S.InputContainer>

      <S.SignUpMessageButton activeOpacity={0.5} onPress={handleNavigateToSignIn}>
        <S.SignUpMessageButtonText>Já possui uma conta?</S.SignUpMessageButtonText>
        <S.SignUpMessageButtonTextBold>Faça Login</S.SignUpMessageButtonTextBold>
      </S.SignUpMessageButton>
    </S.Container>
  );
};

export default Register;
