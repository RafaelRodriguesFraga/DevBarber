import styled from 'styled-components/native';
import { Colors } from '../../shared/colors';

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${Colors.primary};
`;

export const HeaderContainer = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 15px;
`;

export const HeaderText = styled.Text`
  font-weight: bold;
  font-size: 18px;
  color: ${Colors.white};
`;

export const BackButton = styled.TouchableOpacity``;

export const ScrollViewContainer = styled.ScrollView`
  flex: 1;
  padding: 5px 20px 20px 20px;
`;

export const LoadingIcon = styled.ActivityIndicator`
    margin-top: 50px;
`

