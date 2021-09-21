import React, {useState} from 'react';
import {RefreshControl, Text, View} from 'react-native';
import {
  BackButton,
  Container,
  HeaderContainer,
  HeaderText,
  ScrollViewContainer,
  AppointmentItem,
  BarberAvatar,
  BarberName,
  BarberInfo,
  ServiceInfo,
  ServiceName,
  ServicePrice,
  AppointmentDateText,
  AppointmentHourText,
  AppointmentInfo,
  AppointmentDateContainer,
  AppointmentHourContainer,
  LoadingIcon,
} from './style';
import {Images} from "../../shared/images";
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {useNavigation} from '@react-navigation/native';
import {BarberProps} from '../../models/props/barberProps';
import {getBarbers} from '../../services/barber.service';
import {useEffect} from 'react';

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
    <Container>
      <HeaderContainer>
        <BackButton onPress={handleBackButton}>
          <Images.BackIcon width="44" height="44" fill={Colors.white} />
        </BackButton>

        <HeaderText>Agendamentos</HeaderText>
      </HeaderContainer>

      <ScrollViewContainer
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {loading && <LoadingIcon color="#fff" size="large" />}
        {!loading && (
          <>
            {barberList.map((barber: BarberProps) => (
              <AppointmentItem key={barber.id} activeOpacity={0.7}>
                <BarberInfo>
                  <BarberAvatar
                    source={{
                      uri: barber.avatar,
                    }}
                  />
                  <BarberName>{barber.name}</BarberName>
                </BarberInfo>

                <ServiceInfo>
                  <ServiceName>Corte Masculino</ServiceName>
                  <ServicePrice>R$ 29,90</ServicePrice>
                </ServiceInfo>

                <AppointmentInfo>
                  <AppointmentDateContainer>
                    <AppointmentDateText>12/09/2021</AppointmentDateText>
                  </AppointmentDateContainer>

                  <AppointmentHourContainer>
                    <AppointmentHourText>13:00</AppointmentHourText>
                  </AppointmentHourContainer>
                </AppointmentInfo>
              </AppointmentItem>
            ))}
          </>
        )}
      </ScrollViewContainer>
    </Container>
  );
};

export default Appointments;
