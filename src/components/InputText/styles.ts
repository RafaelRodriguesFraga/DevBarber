import styled from "styled-components/native";
import { Colors } from "../../shared/colors";

export const InputContainer = styled.View`
    width: 100%;
    height: 60px;
    background-color: ${Colors.blue3};
    flex-direction: row;
    border-radius: 15px;
    padding-left: 15px;
    align-items: center;
    margin-bottom: 15px;
`

export const Input = styled.TextInput`   
    color: ${Colors.black};
    margin-left: 10px;
    flex: 1;
`