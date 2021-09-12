import styled from 'styled-components/native';
import { Colors } from '../../shared/colors';

export const Container = styled.SafeAreaView`
  background-color: ${Colors.primary};
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const InputContainer = styled.View`
  width: 100%;
  padding: 40px;
  margin-top: 35px;
`;

export const SignInMessageButton = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: center;
  margin-top: 20px;
`;

export const SignInMessageButtonText = styled.Text`
  font-size: 16px;
  color: ${Colors.blue2};
`;

export const SignInMessageButtonTextBold = styled.Text`
  font-size: 16px;
  color: ${Colors.blue2};
  font-weight: bold;
  margin-left: 5px;
`;

