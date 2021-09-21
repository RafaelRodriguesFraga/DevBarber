import styled from 'styled-components/native';
import { Colors } from '../../shared/colors';

export const Container = styled.SafeAreaView`
  background-color: ${Colors.primary};
  flex: 1;  
`;

export const ScrollViewContainer = styled.ScrollView`
   flex: 1;
   padding: 20px;   
`;

export const HeaderContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

export const Title = styled.Text`
    width: 250px;
    font-size: 24px;
    font-weight: bold;
    color: ${Colors.white};
    
`;

export const SearchButton = styled.TouchableOpacity`
    width: 26px;
    height: 26px;
`

export const LocationContainer = styled.View`
    background-color: ${Colors.blue1};
    height: 60px;
    flex-direction: row;
    border-radius: 30px;
    align-items: center;
    padding-left: 20px;
    padding-right: 20px;
    margin-top: 25px;
`;

export const LocationInput = styled.TextInput`
    flex: 1;
    font-size: 16px;
    color: ${Colors.white};
`;

export const LocationButton = styled.TouchableOpacity`
    width: 24px;
    height: 24px;
`

export const LoadingIcon = styled.ActivityIndicator`
    margin-top: 50px;
`

export const BarberListContainer = styled.View`
    margin-top: 30px;
    margin-bottom: 30px;
`



