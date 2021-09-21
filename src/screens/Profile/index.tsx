import React, {useState, useEffect} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {User} from '../../models/user';
import {getBarberProfile} from '../../services/barber.service';

import * as S from './styles';

import Swiper from 'react-native-swiper';
import Stars from '../../components/Stars';
import {Colors} from '../../shared/colors';
import {Images} from '../../shared/images';
import BarberModal from '../../components/BarberModal';
import {setFavorite} from '../../services/user.service';

type RouteParams = {
  id: number;
  avatar: string;
  name: string;
  stars: number;
};

const Profile = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const routeParams = route.params as RouteParams;

  const [userData, setUserData] = useState<User>({} as User);
  const [loading, setLoading] = useState(false);
  const [favorited, setFavorited] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedService, setSelectedService] = useState(0);

  useEffect(() => {
    getBarberInfo();
  }, []);

  const getBarberInfo = async () => {
    try {
      setLoading(true);

      const response = await getBarberProfile(routeParams.id);
      const {data, favorited} = response!.data;
      setUserData(data);
      setFavorited(favorited);

      setLoading(false);
    } catch (error) {
      alert(`Error: ${error.message}`);
      setLoading(false);
    }
  };

  const handleBackButton = () => {
    navigation.goBack();
  };

  const handleFavorite = async () => {
    setFavorited(!favorited);

    try {
      const response = await setFavorite(routeParams.id);
      return response;
    } catch (error) {
      alert(`Erro: ${error.message}`);
    }
  };

  const handleSchedule = (key: number) => {
    setSelectedService(key);
    setShowModal(true);
  };

  return (
    <S.Container>
      <S.BackButton onPress={handleBackButton}>
        <Images.BackIcon width="44" height="44" fill={Colors.white} />
      </S.BackButton>

      <S.ScrollViewContainer>
        {userData.photos && userData.photos.length > 0 ? (
          <Swiper
            height={240}
            dot={<S.SwipeDot />}
            activeDot={<S.SwipeDotActive />}
            paginationStyle={{
              top: 15,
              right: 15,
              bottom: 200,
              left: 300,
            }}
            autoplay>
            {userData.photos.map((photos, key) => (
              <S.SwipeItem key={key}>
                <S.SwipeImage source={{uri: photos.url}} />
              </S.SwipeItem>
            ))}
          </Swiper>
        ) : (
          <S.FakeSwiper />
        )}

        <S.PageContainer>
          <S.UserInfoContainer>
            <S.UserAvatar source={{uri: routeParams.avatar}} />
            <S.UserInfo>
              <S.Name>{routeParams.name}</S.Name>
              <Stars rating={routeParams.stars} showRatingNumber />
            </S.UserInfo>

            <S.FavoriteButton onPress={handleFavorite} activeOpacity={0.7}>
              {favorited ? (
                <Images.FavoriteFullIcon
                  width="24"
                  height="24"
                  fill={Colors.red}
                />
              ) : (
                <Images.FavoriteIcon width="24" height="24" fill={Colors.red} />
              )}
            </S.FavoriteButton>
          </S.UserInfoContainer>

          {loading && <S.LoadingIcon size="large" color={Colors.black} />}

          {userData.services && (
            <S.ServiceContainer>
              <S.Title>Lista de Serviços</S.Title>

              {userData.services.map((service, key) => (
                <S.ServiceItem key={key}>
                  <S.ServiceInfo>
                    <S.ServiceName>{service.name}</S.ServiceName>
                    <S.ServicePrice>R$ {service.price}</S.ServicePrice>
                  </S.ServiceInfo>

                  <S.ScheduleBarberButton
                    activeOpacity={0.7}
                    onPress={() => handleSchedule(key)}>
                    <S.ScheduleBarberButtonText>Agendar</S.ScheduleBarberButtonText>
                  </S.ScheduleBarberButton>
                </S.ServiceItem>
              ))}
            </S.ServiceContainer>
          )}

          {userData.testimonials && userData.testimonials.length > 0 && (
            <S.TestimonialsContainer>
              <Swiper
                style={{height: 110}}
                showsPagination={false}
                showsButtons
                prevButton={
                  <Images.PrevIcon width="35" height="35" fill={Colors.black} />
                }
                nextButton={
                  <Images.NextIcon width="35" height="35" fill={Colors.black} />
                }>
                {userData.testimonials.map((testimonial, key) => (
                  <S.TestimonialItem key={key}>
                    <S.TestmonialInfo>
                      <S.TestimonialName>{testimonial.name}</S.TestimonialName>
                      <Stars rating={testimonial.rate} />
                    </S.TestmonialInfo>
                    <S.TestimonialBody>{testimonial.body}</S.TestimonialBody>
                  </S.TestimonialItem>
                ))}
              </Swiper>
            </S.TestimonialsContainer>
          )}
        </S.PageContainer>
      </S.ScrollViewContainer>

      <BarberModal
        show={showModal}
        dismissButton={setShowModal}
        user={userData}
        service={selectedService}
      />
    </S.Container>
  );
};

export default Profile;
