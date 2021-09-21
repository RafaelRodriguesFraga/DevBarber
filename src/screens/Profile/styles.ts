import {Colors} from '../../shared/colors';
import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${Colors.white};
`;

export const BackButton = styled.TouchableOpacity`
  position: absolute;
  left: 8px;
  top: 8px;
  z-index: 1;
`;

export const ScrollViewContainer = styled.ScrollView`
  flex: 1;
`;

export const SwipeDot = styled.View`
  width: 10px;
  height: 10px;
  background-color: ${Colors.white};
  border-radius: 5px;
  margin: 3px;
`;
export const SwipeDotActive = styled.View`
  width: 10px;
  height: 10px;
  border-radius: 5px;
  margin: 3px;
  background-color: ${Colors.black};
`;

export const SwipeItem = styled.View`
  flex: 1;
  background-color: ${Colors.primary};
`;

export const SwipeImage = styled.Image`
  width: 100%;
  height: 240px;
`;

export const FakeSwiper = styled.View`
  height: 160px;
  background-color: ${Colors.primary};
`;

export const PageContainer = styled.View`
  background-color: ${Colors.white};
  border-top-left-radius: 50px;
  margin-top: -50px;
   min-height: 400px;
`;

export const UserInfoContainer = styled.View`
  flex-direction: row;
  margin-top: -30px;
`;

export const UserAvatar = styled.Image`
  width: 110px;
  height: 110px;
  border-radius: 20px;
  margin: 0 20px 0 30px;
  border-width: 4px;
  border-color: ${Colors.white};
`;

export const UserInfo = styled.View`
  flex: 1;
  justify-content: flex-end;
`;

export const Name = styled.Text`
  color: ${Colors.black};
  font-size: 18px;
  font-weight: bold;
`;

export const FavoriteButton = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  background-color: ${Colors.white};
  border-radius: 20px;
  border: 2px solid ${Colors.gray2};
  justify-content: center;
  align-items: center;
  margin-left: 20px;
  margin-right: 20px;
  margin-top: 10px;
`;
export const LoadingIcon = styled.ActivityIndicator`
  margin-top: 50px;
`;

export const ServiceContainer = styled.View`
  margin-top: 40px;
`;

export const Title = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${Colors.black};
  margin: 0 0 20px 30px; // top-right-bottom-left
`;

export const ServiceItem = styled.View`
  flex-direction: row;
  margin: 0 30px 20px 30px;
`;

export const ServiceInfo = styled.View`
  flex: 1;
`;

export const ServiceName = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${Colors.blue2};
`;

export const ServicePrice = styled.Text`
  font-size: 14px;
  color: ${Colors.blue2};
`;

export const ScheduleBarberButton = styled.TouchableOpacity`
  background-color: ${Colors.blue1};
  border-radius: 10px;
  padding: 10px 15px;
`;

export const ScheduleBarberButtonText = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: ${Colors.white};
`;

export const TestimonialsContainer = styled.View`
    margin: 35px 0 50px 0;
`;

export const TestimonialItem = styled.View`
  background-color: ${Colors.blue2};
  padding: 15px;
  border-radius: 10px;
  height: 110px;
  justify-content: center;
  margin-left: 50px;
  margin-right: 50px;
`;

export const TestmonialInfo = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 15px;
`;

export const TestimonialName = styled.Text`
  color: ${Colors.white};
  font-size: 14px;
  font-weight: bold;
`;

export const TestimonialBody = styled.Text`
  color: ${Colors.white};
  font-size: 13px;

`;
