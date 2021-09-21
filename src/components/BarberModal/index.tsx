import React, {useState, useEffect} from 'react';
import {User} from '../../models/user';
import {Colors} from '../../shared/colors';
import {
  ModalContainer,
  ModalBlackArea,
  ModalBody,
  DismissButton,
  ModalItem,
  UserAvatar,
  UserInfo,
  UserName,
  ServiceInfo,
  ServiceName,
  ServicePrice,
  FinishScheduleButton,
  FinishScheduleButtonText,
  DateInfo,
  DateTitle,
  DateTitleContainer,
  NextDate,
  PrevDate,
  DateList,
  DateItem,
  DayOfTheWeek,
  DayOfMonth,
  TimeList,
  TimeItem,
  AvailableHour,
} from './styles';

import {Images} from "../../shared/images";

import {months, daysOftheWeek} from '../../shared/calendarConstants';

import {useNavigation} from '@react-navigation/native';
import {setAppointment} from '../../services/user.service';
import {Appointment} from '../../models/appointment';

type BarberModalProps = {
  show: boolean;
  dismissButton: (showModal: boolean) => void;
  user: User;
  service: number;
};

type DayProps = {
  status: boolean;
  daysOfTheWeek: string;
  dayOfMonth: number;
};

const BarberModal = ({
  show,
  dismissButton,
  user,
  service,
}: BarberModalProps) => {
  const navigation = useNavigation();
  const [selectedYear, setSelectedYear] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState(0);
  const [selectedDay, setSelectedDay] = useState(0);
  const [selectedHour, setSelectedHour] = useState<string>('');
  const [days, setDays] = useState<DayProps[]>([]);
  const [hours, setHours] = useState<string[]>([]);

  useEffect(() => {
    let currentDate = new Date();
    setSelectedYear(currentDate.getFullYear());
    setSelectedMonth(currentDate.getMonth());
    setSelectedDay(currentDate.getDay());
  }, []);

  useEffect(() => {
    if (user.available) {
      /* Go to the next month. There's no day 0 in a month, 
        so it will be returned to the last day of the
         previous month, showing the last day of that month */
      let daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();

      let newDays = [] as DayProps[];

      for (let i = 1; i <= daysInMonth; i++) {
        let date = new Date(selectedYear, selectedMonth, i);

        const fullDate = getFullDate(date);

        let availableDates = user.available.filter(
          available => available.date === fullDate,
        );

        newDays.push({
          status: availableDates.length > 0 ? true : false,
          daysOfTheWeek: daysOftheWeek[date.getDay()],
          dayOfMonth: i,
        });
      }

      setDays(newDays);
      setSelectedDay(0);
      setHours([]);
      setSelectedHour('');
    }
  }, [user, selectedMonth, selectedYear]);

  useEffect(() => {
    if (user.available && selectedDay > 0) {
      let date = new Date(selectedYear, selectedMonth, selectedDay);

      let fullDate = getFullDate(date);

      let availableDates = user.available.filter(
        available => available.date === fullDate,
      );

      if (availableDates.length > 0) {
        setHours(availableDates[0].hours);
      }
    }

    setSelectedHour('');
  }, [user, selectedDay]);

  const handleDismiss = () => {
    dismissButton(false);
  };

  const handlePrevDate = () => {
    const date = new Date(selectedYear, selectedMonth, 1);
    date.setMonth(date.getMonth() - 1);

    setSelectedYear(date.getFullYear());
    setSelectedMonth(date.getMonth());
    setSelectedDay(0);
  };

  const handleNextDate = () => {
    const date = new Date(selectedYear, selectedMonth, 1);
    date.setMonth(date.getMonth() + 1);

    setSelectedYear(date.getFullYear());
    setSelectedMonth(date.getMonth());
    setSelectedDay(0);
  };

  const getFullDate = (date: Date) => {
    let year = date.getFullYear();
    let month = (date.getMonth() + 1) as string | number;
    let day = date.getDate() as string | number;

    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;

    let fullDate = `${year}-${month}-${day}`;

    return fullDate;
  };

  const handleFinishSchedule = async () => {
    const appointment: Appointment = {
      id: user.id,
      service: user.services,
      year: selectedYear,
      month: selectedMonth,
      day: selectedDay,
      hour: selectedHour,
    };

    if (
      user.id &&
      service != null &&
      selectedYear > 0 &&
      selectedDay > 0 &&
      selectedHour != ''
    ) {
      try {
        // await setAppointment(appointment);

        dismissButton(false);

        navigation.navigate('Appointments');
      } catch (error) {
        alert(error.nessage);
      }
    } else {
      alert('Todas as informações são obrigatórias');
    }
  };

  return (
    <ModalContainer transparent visible={show} animationType="slide">
      <ModalBlackArea>
        <ModalBody>
          <DismissButton onPress={handleDismiss}>
            <Images.ExpandIcon width="40" height="40" fill={Colors.black} />
          </DismissButton>

          <ModalItem>
            <UserInfo>
              <UserAvatar source={{uri: user.avatar}} />
              <UserName>{user.name}</UserName>
            </UserInfo>
          </ModalItem>

          <ModalItem>
            {user.services && (
              <ServiceInfo>
                <ServiceName>{user.services[service].name}</ServiceName>
                <ServicePrice>
                  R$ {user.services[service].price.toFixed(2)}
                </ServicePrice>
              </ServiceInfo>
            )}
          </ModalItem>

          <ModalItem>
            <DateInfo>
              <PrevDate activeOpacity={0.7} onPress={handlePrevDate}>
                <Images.PrevIcon width="35" height="35" fill={Colors.black} />
              </PrevDate>

              <DateTitleContainer>
                <DateTitle>
                  {months[selectedMonth]} {selectedYear}
                </DateTitle>
              </DateTitleContainer>

              <NextDate activeOpacity={0.7} onPress={handleNextDate}>
                <Images.NextIcon width="35" height="35" fill={Colors.black} />
              </NextDate>
            </DateInfo>

            <DateList horizontal showsHorizontalScrollIndicator={false}>
              {days.map((day, key) => (
                <DateItem
                  activeOpacity={0.5}
                  key={key}
                  onPress={() =>
                    day.status ? setSelectedDay(day.dayOfMonth) : null
                  }
                  style={{
                    opacity: day.status ? 1 : 0.5,
                    backgroundColor:
                      day.dayOfMonth === selectedDay
                        ? `${Colors.blue1}`
                        : `${Colors.white}`,
                  }}>
                  <DayOfTheWeek
                    style={{
                      color:
                        day.dayOfMonth === selectedDay
                          ? `${Colors.white}`
                          : `${Colors.black}`,
                    }}>
                    {day.daysOfTheWeek}
                  </DayOfTheWeek>
                  <DayOfMonth
                    style={{
                      color:
                        day.dayOfMonth === selectedDay
                          ? `${Colors.white}`
                          : `${Colors.black}`,
                    }}>
                    {day.dayOfMonth}
                  </DayOfMonth>
                </DateItem>
              ))}
            </DateList>
          </ModalItem>

          {selectedDay > 0 && hours.length > 0 && (
            <ModalItem>
              <TimeList horizontal showsHorizontalScrollIndicator={false}>
                {hours.map((hour, key) => (
                  <TimeItem
                    key={key}
                    onPress={() => setSelectedHour(hour)}
                    style={{
                      backgroundColor:
                        hour === selectedHour
                          ? `${Colors.blue1}`
                          : `${Colors.white}`,
                    }}>
                    <AvailableHour
                      style={{
                        color:
                          hour === selectedHour
                            ? `${Colors.white}`
                            : `${Colors.black}`,
                      }}>
                      {hour}
                    </AvailableHour>
                  </TimeItem>
                ))}
              </TimeList>
            </ModalItem>
          )}

          <FinishScheduleButton
            activeOpacity={0.7}
            onPress={handleFinishSchedule}>
            <FinishScheduleButtonText>
              Finalizar Agendamento
            </FinishScheduleButtonText>
          </FinishScheduleButton>
        </ModalBody>
      </ModalBlackArea>
    </ModalContainer>
  );
};

export default BarberModal;
