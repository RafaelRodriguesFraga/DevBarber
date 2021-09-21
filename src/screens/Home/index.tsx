import React, {useState, useEffect} from 'react';
import {Images} from "../../shared/images";
import {
  Container,
  ScrollViewContainer,
  HeaderContainer,
  Title,
  SearchButton,
  LocationContainer,
  LocationInput,
  LocationButton,
  LoadingIcon,
  BarberListContainer,
} from './style';
import {useNavigation} from '@react-navigation/native';
import {Platform, RefreshControl} from 'react-native';
import {PERMISSIONS, request} from 'react-native-permissions';
import Geolocation, {
  GeolocationResponse,
} from '@react-native-community/geolocation';
import {getBarbers} from '../../services/barber.service';
import BarberItem from '../../components/BarberItem';
import {Colors} from '../../shared/colors';
import {Location} from '../../models/location';
import {BarberProps} from '../../models/props/barberProps';

const Home = () => {
  const navigation = useNavigation();

  const [locationText, setLocationlocationText] = useState<string>('');
  const [mapCoords, setMapCoords] = useState<GeolocationResponse>(
    {} as GeolocationResponse,
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [barberList, setBarberList] = useState<BarberProps[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    listBarbers();
  }, []);

  const handleNavigateToSearch = () => {
    navigation.navigate('Search');
  };

  const listBarbers = async () => {
    setLoading(true);
    setBarberList([]);

    let lat = '';
    let lng = '';

    const location: Location = {
      lat,
      lng,
    };

    if (mapCoords.coords) {
      lat = String(mapCoords.coords.latitude);
      lng = String(mapCoords.coords.longitude);
    }

    try {
      const response = await getBarbers(lat, lng, locationText);

      const {data, loc} = response.data;

      if (loc) {
        setLocationlocationText(loc);
      }

      setBarberList(data);

      setLoading(false);
    } catch (error) {
      throw error;
    }
  };

  const onRefresh = () => {
    setRefreshing(false);
    listBarbers();
  };

  const handleLocation = async () => {
    setMapCoords({} as GeolocationResponse);

    const permission =
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
        : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;

    try {
      let result = await request(permission);

      if (result == 'granted') {
        setLoading(true);
        setLocationlocationText('');
        setBarberList([]);

        Geolocation.getCurrentPosition(
          info => {
            setMapCoords(info);
            listBarbers();
          },
          error => {
            alert(error.message);
            console.error(error.code, error.message);
          },

          {enableHighAccuracy: true, timeout: 20000},
        );
      }
    } catch (error) {
      throw error;
    }
  };

  const handleLocationSearch = async () => {
    setMapCoords({} as GeolocationResponse);
    await listBarbers();
  };

  return (
    <Container>
      <ScrollViewContainer
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <HeaderContainer>
          <Title>Encontre o seu barbeiro favorito</Title>
          <SearchButton onPress={handleNavigateToSearch}>
            <Images.SearchIcon width="26" height="26" fill="#FFF" />
          </SearchButton>
        </HeaderContainer>

        <LocationContainer>
          <LocationInput
            placeholder="Onde você está?"
            placeholderTextColor="#FFF"
            value={locationText}
            onChangeText={locationText => setLocationlocationText(locationText)}
            onEndEditing={handleLocationSearch}
          />
          <LocationButton onPress={handleLocation}>
            <Images.LocationIcon width="24" height="24" fill={Colors.white} />
          </LocationButton>
        </LocationContainer>

        {loading && <LoadingIcon size="large" color={Colors.white} />}

        <BarberListContainer>
          {barberList.map((baberProps: BarberProps) => {
            return <BarberItem key={baberProps.id} user={baberProps} />;
          })}
        </BarberListContainer>
      </ScrollViewContainer>
    </Container>
  );
};

export default Home;
