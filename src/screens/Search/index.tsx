import React, {useEffect, useState} from 'react';
import {RefreshControl} from 'react-native';
import * as S from './styles';

import {Colors} from '../../shared/colors';
import {useNavigation} from '@react-navigation/native';
import {BarberProps} from '../../models/props/barberProps';
import {getBarbers} from '../../services/barber.service';
import BarberItem from '../../components/BarberItem';
import BackButton from '../../components/BackButton';

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
    <S.Container>
      <S.HeaderContainer>
        <BackButton activeOpacity={0.5} onPress={handleBackButton} />

        <S.InputSearch
          placeholder="Digite o nome do barbeiro"
          placeholderTextColor={Colors.white}
          value={searchText}
          onChangeText={text => handleSearch(text)}
        />
      </S.HeaderContainer>

      <S.ScrollViewContainer
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {loading && <S.LoadingIcon size="large" color="#fff" />}
        {!loading && filteredList.length > 0 && (
          <>
            {filteredList.map((barber, key) => (
              <BarberItem key={key} user={barber} />
            ))}
          </>
        )}
      </S.ScrollViewContainer>
    </S.Container>
  );
};

export default Search;
