import styled from "styled-components/native";
import { Colors } from "../../shared/colors";

export const TabArea = styled.View`
    height: 60px;
    background-color: ${Colors.blue1};
    flex-direction: row;
`

export const TabItem = styled.TouchableOpacity`
    flex: 1;
    justify-content: center;
    align-items: center;
`

export const TabItemCenter = styled.TouchableOpacity`
    width: 70px;
    height: 70px;
    justify-content: center;
    align-items: center;
    background-color: ${Colors.white};
    border-radius: 35px;
    border: 3px solid ${Colors.blue1};    
    margin-top: -20px;
`

export const AvatarIcon = styled.Image`
    width: 24px;
    height: 24px;
    border-radius: 12px;
`