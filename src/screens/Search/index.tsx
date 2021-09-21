import React, {useEffect, useState} from 'react';
import {RefreshControl} from 'react-native';
import {
  BackButton,
  Container,
  InputSearch,
  ScrollViewContainer,
  HeaderContainer,
  LoadingIcon,
} from './style';
import {Images} from "../../shared/images";
import {Colors} from '../../shared/colors';
import {useNavigation} from '@react-navigation/native';
import {BarberProps} from '../../models/props/barberProps';
import {getBarbers} from '../../services/barber.service';
import BarberItem from '../../components/BarberItem';

const Search = () => {
  const navigation = useNavigation();

  const [barberList, setBarberList] = useState<BarberProps[]>([]);
  const [filteredList, setFilteredList] = useState<BarberProps[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');

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
      setFilteredList(data);
      setSearchText('');

      setLoading(false);
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const handleSearch = (text: string) => {
    let newFilteredList = [] as BarberProps[];

    newFilteredList = barberList.filter(barber => {
      if (text === '' || barber.name.includes(text)) {
        return barber;
      }
    });

    setSearchText(text);
    setFilteredList(newFilteredList);
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

        <InputSearch
          placeholder="Digite o nome do barbeiro"
          placeholderTextColor={Colors.white}
          value={searchText}
          onChangeText={text => handleSearch(text)}
        />
      </HeaderContainer>

      <ScrollViewContainer
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {loading && <LoadingIcon size="large" color="#fff" />}
        {!loading && filteredList.length > 0 && (
          <>
            {filteredList.map((barber, key) => (
              <BarberItem key={key} user={barber} />
            ))}
          </>
        )}
      </ScrollViewContainer>
    </Container>
  );
};

export default Search;
