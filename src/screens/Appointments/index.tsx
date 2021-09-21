import React, {useState, useEffect} from 'react';
import {RefreshControl} from 'react-native';
import * as S from './styles';
import {useNavigation} from '@react-navigation/native';
import {BarberProps} from '../../models/props/barberProps';
import {getBarbers} from '../../services/barber.service';
import BackButton from '../../components/BackButton';

const Appointments = () => {
  const navigation = useNavigation();
  const [barberList, setBarberList] = useState<BarberProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    listBarbers();
  }, []);

  const handleBackButton = () => {
    navigation.goBack();
  };

  const listBarbers = async () => {
    try {
      setLoading(true);

      const response = await getBarbers();
      const {data} = response.data;

      setBarberList(data);

      setLoading(false);
    } catch (error) {
      alert('Erro ao listar: ' + error);
      setLoading(false);

      throw error;
    }
  };

  const onRefresh = () => {
    setRefreshing(false);
    listBarbers();
  };

  return (
    <S.Container>
      <S.HeaderContainer>
        <BackButton activeOpacity={0.5} onPress={handleBackButton} />

        <S.HeaderText>Agendamentos</S.HeaderText>
      </S.HeaderContainer>

      <S.ScrollViewContainer
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {loading && <S.LoadingIcon color="#fff" size="large" />}
        {!loading && (
          <>
            {barberList.map((barber: BarberProps) => (
              <S.AppointmentItem key={barber.id} activeOpacity={0.7}>
                <S.BarberInfo>
                  <S.BarberAvatar
                    source={{
                      uri: barber.avatar,
                    }}
                  />
                  <S.BarberName>{barber.name}</S.BarberName>
                </S.BarberInfo>

                <S.ServiceInfo>
                  <S.ServiceName>Corte Masculino</S.ServiceName>
                  <S.ServicePrice>R$ 29,90</S.ServicePrice>
                </S.ServiceInfo>

                <S.AppointmentInfo>
                  <S.AppointmentDateContainer>
                    <S.AppointmentDateText>12/09/2021</S.AppointmentDateText>
                  </S.AppointmentDateContainer>

                  <S.AppointmentHourContainer>
                    <S.AppointmentHourText>13:00</S.AppointmentHourText>
                  </S.AppointmentHourContainer>
                </S.AppointmentInfo>
              </S.AppointmentItem>
            ))}
          </>
        )}
      </S.ScrollViewContainer>
    </S.Container>
  );
};

export default Appointments;
