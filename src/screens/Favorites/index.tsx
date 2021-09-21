import React from 'react';
import {RefreshControl} from 'react-native';
import {Colors} from '../../shared/colors';
import {
  Container,
  BackButton,
  HeaderContainer,
  HeaderText,
  ScrollViewContainer,
  LoadingIcon,
} from './style';
import {Images} from "../../shared/images";
import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import {useEffect} from 'react';
import {BarberProps} from '../../models/props/barberProps';
import {getBarbers} from '../../services/barber.service';
import BarberItem from '../../components/BarberItem';

const Favorites = () => {
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);

  const [barberList, setBarberList] = useState<BarberProps[]>([]);
  const [loading, setLoading] = useState(false);

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

        <HeaderText>Favoritos</HeaderText>
      </HeaderContainer>

      <ScrollViewContainer
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {loading && <LoadingIcon color="#fff" size="large" />}
        {!loading && (
          <>
            {barberList.map((barber: BarberProps) => (
              <BarberItem key={barber.id} user={barber} />
            ))}
          </>
        )}
      </ScrollViewContainer>
    </Container>
  );
};

export default Favorites;
