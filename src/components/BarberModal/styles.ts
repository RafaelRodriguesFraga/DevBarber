import styled from 'styled-components/native';
import {Colors} from '../../shared/colors';

export const ModalContainer = styled.Modal``;

export const ModalBlackArea = styled.View`
  flex: 1;
  background-color: ${Colors.blackOpacity50p};
  justify-content: flex-end;
`;

export const ModalBody = styled.View`
  background-color: ${Colors.blue3};
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  min-height: 300px;
  padding: 10px 20px 40px 20px;
`;

export const DismissButton = styled.TouchableOpacity``;

export const ModalItem = styled.View`
  background-color: ${Colors.white};
  border-radius: 10px;
  margin-bottom: 15px;
  padding: 10px;
`;

export const UserInfo = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const UserAvatar = styled.Image`
  width: 56px;
  height: 56px;
  border-radius: 20px;
  margin-right: 15px;
`;

export const UserName = styled.Text`
  color: ${Colors.black};
  font-size: 18px;
  font-weight: bold;
`;

export const ServiceInfo = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;
export const ServiceName = styled.Text`
  font-weight: bold;
  font-size: 18px;
`;

export const ServicePrice = styled(ServiceName)``;

export const DateInfo = styled.View`
    flex-direction: row;
`;

export const DateList = styled.ScrollView``;

export const PrevDate = styled.TouchableOpacity`
    flex: 1;
    justify-content: flex-end;
    align-items: flex-end;
`;

export const DateTitleContainer = styled.View`
    width: 140px;
    justify-content: center;
    align-items: center;
`;

export const DateTitle = styled.Text`
    font-size: 17px;
    font-weight: bold;
    color: ${Colors.black};

`;

export const NextDate = styled.TouchableOpacity`
    flex: 1;
    justify-content: flex-start;
    align-items: flex-start;
`;

export const FinishScheduleButton = styled.TouchableOpacity`
  background-color: ${Colors.blue2};
  height: 60px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
`;

export const FinishScheduleButtonText = styled.Text`
  color: ${Colors.white};
  font-size: 17px;
  font-weight: bold;
`;

export const DateItem = styled.TouchableOpacity`
    width: 45px;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    padding: 5px 5px;
    margin-left: 2px;

`;
export const DayOfTheWeek = styled.Text`
  font-size: 16px;
  font-weight: bold;
`;

export const DayOfMonth = styled(DayOfTheWeek)``;

export const TimeList = styled.ScrollView`` 
export const TimeItem = styled.TouchableOpacity`
    width: 75px;
    height: 40px;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
` 
export const AvailableHour = styled.Text`
    font-size: 16px;
` 



