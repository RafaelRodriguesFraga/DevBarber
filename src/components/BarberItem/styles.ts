import styled from 'styled-components/native';
import { Colors } from '../../shared/colors';

export const ButtonContainer = styled.TouchableOpacity`
  background-color: ${Colors.white};
  margin-bottom: 20px;
  border-radius: 20px;
  padding: 15px;
  flex-direction: row;
`;
export const Avatar = styled.Image`
    width: 88px;
    height: 88px;
    border-radius: 20px;
`;

export const UserInfoContainer = styled.View`
    margin-left: 20px;
    justify-content: space-between;
`;
export const Username = styled.Text`
    font-size: 17px;
    font-weight: bold;
`;

export const ProfileButton = styled.TouchableOpacity`
    width: 85px;
    height: 26px;
    border: 1px solid ${Colors.blue1};
    border-radius: 10px;
    justify-content: center;
    align-items: center;
`;
export const ProfileButtonText = styled.Text`
    font-size: 13px;
    color: ${Colors.blue2}
`;
