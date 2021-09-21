import React, {useState, useEffect} from 'react';
import {User} from '../../models/user';
import {Colors} from '../../shared/colors';
import * as S from './styles';

import {Images} from '../../shared/images';
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
    <S.ModalContainer transparent visible={show} animationType="slide">
      <S.ModalBlackArea>
        <S.ModalBody>
          <S.DismissButton onPress={handleDismiss}>
            <Images.ExpandIcon width="40" height="40" fill={Colors.black} />
          </S.DismissButton>

          <S.ModalItem>
            <S.UserInfo>
              <S.UserAvatar source={{uri: user.avatar}} />
              <S.UserName>{user.name}</S.UserName>
            </S.UserInfo>
          </S.ModalItem>

          <S.ModalItem>
            {user.services && (
              <S.ServiceInfo>
                <S.ServiceName>{user.services[service].name}</S.ServiceName>
                <S.ServicePrice>
                  R$ {user.services[service].price.toFixed(2)}
                </S.ServicePrice>
              </S.ServiceInfo>
            )}
          </S.ModalItem>

          <S.ModalItem>
            <S.DateInfo>
              <S.PrevDate activeOpacity={0.7} onPress={handlePrevDate}>
                <Images.PrevIcon width="35" height="35" fill={Colors.black} />
              </S.PrevDate>

              <S.DateTitleContainer>
                <S.DateTitle>
                  {months[selectedMonth]} {selectedYear}
                </S.DateTitle>
              </S.DateTitleContainer>

              <S.NextDate activeOpacity={0.7} onPress={handleNextDate}>
                <Images.NextIcon width="35" height="35" fill={Colors.black} />
              </S.NextDate>
            </S.DateInfo>

            <S.DateList horizontal showsHorizontalScrollIndicator={false}>
              {days.map((day, key) => (
                <S.DateItem
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
                  <S.DayOfTheWeek
                    style={{
                      color:
                        day.dayOfMonth === selectedDay
                          ? `${Colors.white}`
                          : `${Colors.black}`,
                    }}>
                    {day.daysOfTheWeek}
                  </S.DayOfTheWeek>
                  <S.DayOfMonth
                    style={{
                      color:
                        day.dayOfMonth === selectedDay
                          ? `${Colors.white}`
                          : `${Colors.black}`,
                    }}>
                    {day.dayOfMonth}
                  </S.DayOfMonth>
                </S.DateItem>
              ))}
            </S.DateList>
          </S.ModalItem>

          {selectedDay > 0 && hours.length > 0 && (
            <S.ModalItem>
              <S.TimeList horizontal showsHorizontalScrollIndicator={false}>
                {hours.map((hour, key) => (
                  <S.TimeItem
                    key={key}
                    onPress={() => setSelectedHour(hour)}
                    style={{
                      backgroundColor:
                        hour === selectedHour
                          ? `${Colors.blue1}`
                          : `${Colors.white}`,
                    }}>
                    <S.AvailableHour
                      style={{
                        color:
                          hour === selectedHour
                            ? `${Colors.white}`
                            : `${Colors.black}`,
                      }}>
                      {hour}
                    </S.AvailableHour>
                  </S.TimeItem>
                ))}
              </S.TimeList>
            </S.ModalItem>
          )}

          <S.FinishScheduleButton
            activeOpacity={0.7}
            onPress={handleFinishSchedule}>
            <S.FinishScheduleButtonText>
              Finalizar Agendamento
            </S.FinishScheduleButtonText>
          </S.FinishScheduleButton>
        </S.ModalBody>
      </S.ModalBlackArea>
    </S.ModalContainer>
  );
};

export default BarberModal;
