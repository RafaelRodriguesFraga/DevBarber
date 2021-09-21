import styled from 'styled-components/native';
import {Colors} from '../../shared/colors';

export const Container = styled.SafeAreaView`
  background-color: ${Colors.primary};
  flex: 1;
`;

export const HeaderContainer = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 15px;
`;

export const BackButton = styled.TouchableOpacity``;

export const InputSearch = styled.TextInput`
  flex: 1;
  color: ${Colors.white};
  background-color: ${Colors.blue1};
  height: 50px;
  padding: 0 20px 0 20px;
  border-radius: 30px;
`;

export const ScrollViewContainer = styled.ScrollView`
  flex: 1;
  padding: 5px 20px 20px 20px;
`;

export const LoadingIcon = styled.ActivityIndicator`
  margin-top: 50px;
`;
