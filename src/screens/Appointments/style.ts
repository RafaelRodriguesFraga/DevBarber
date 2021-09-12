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

export const ScrollViewContainer = styled.ScrollView`
  flex: 1;
  padding: 5px 20px 20px 20px;
`;

export const LoadingIcon = styled.ActivityIndicator`
    margin-top: 50px;
`

export const AppointmentItem = styled.TouchableOpacity`
  background-color: ${Colors.white};
  padding: 15px;
  margin-bottom: 20px;
  border-radius: 20px;
`;

export const BarberInfo = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const BarberAvatar = styled.Image`
  width: 70px;
  height: 70px;
  border-radius: 20px;
`;
export const BarberName = styled.Text`
  font-weight: bold;
  font-size: 18px;
  margin-left: 15px;
`;

export const ServiceInfo = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 15px;
`;

export const ServiceName = styled.Text`
  font-weight: bold;
  font-size: 17px;
`;

export const ServicePrice = styled(ServiceName)``;

export const AppointmentInfo = styled(ServiceInfo)``;

export const AppointmentDateContainer = styled.View`
  background-color: ${Colors.blue1};
  padding: 14px 20px; /* top-bottom left-right */
  align-items: center;
  justify-content: center;
  border-radius: 10px;
`;

export const AppointmentDateText = styled.Text`
  font-weight: bold;
  color: ${Colors.white};
  font-size: 15px;
`;

export const AppointmentHourContainer = styled(AppointmentDateContainer)`
  padding: 14px 16px;
`;

export const AppointmentHourText = styled(AppointmentDateText)``;
