import styled from 'styled-components/native';
import {Colors} from '../../shared/colors';

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
export const SettingsItemContainer = styled.View`
`;
