import React from "react";
import styled from "styled-components/native";
import { Colors } from "../../shared/colors";

export const Container = styled.View`
    background-color: ${Colors.primary};
    flex: 1;
    justify-content: center;
    align-items: center;

`

export const LoadingIcon = styled.ActivityIndicator`
    margin-top: 50px;
    
`