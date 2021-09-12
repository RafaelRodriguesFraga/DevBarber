import React, {useState} from 'react';
import {View, Text, Alert} from 'react-native';
import {
  Container,
  InputContainer,
  SignUpMessageButton,
  SignUpMessageButtonText,
  SignUpMessageButtonTextBold,
} from './styles';
import BarberLogo from '../../assets/barber.svg';
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
    <Container>
      <BarberLogo width="100%" height="120" />

      <InputContainer>
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
      </InputContainer>

      <SignUpMessageButton activeOpacity={0.5} onPress={handleNavigateToSignIn}>
        <SignUpMessageButtonText>Já possui uma conta?</SignUpMessageButtonText>
        <SignUpMessageButtonTextBold>Faça Login</SignUpMessageButtonTextBold>
      </SignUpMessageButton>
    </Container>
  );
};

export default Register;
