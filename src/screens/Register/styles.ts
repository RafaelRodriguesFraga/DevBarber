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
  margin-top: 5px;
`;

export const SignUpMessageButton = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: center;
  
`;

export const SignUpMessageButtonText = styled.Text`
  font-size: 16px;
  color: ${Colors.blue2};
`;

export const SignUpMessageButtonTextBold = styled.Text`
  font-size: 16px;
  color: ${Colors.blue2};
  font-weight: bold;
  margin-left: 5px;
`;
