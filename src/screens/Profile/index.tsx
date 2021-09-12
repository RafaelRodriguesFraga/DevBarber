import React, {useState, useEffect} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {logout} from '../../services/auth.service';
import {User} from '../../models/user';
import {getBarberProfile} from '../../services/barber.service';
import {
  Container,
  BackButton,
  ScrollViewContainer,
  SwipeDot,
  SwipeDotActive,
  SwipeItem,
  SwipeImage,
  FakeSwiper,
  PageContainer,
  UserInfoContainer,
  UserAvatar,
  UserInfo,
  Name,
  FavoriteButton,
  LoadingIcon,
  ServiceContainer,
  Title,
  ServiceItem,
  ServiceInfo,
  ServiceName,
  ServicePrice,
  ScheduleBarberButton,
  ScheduleBarberButtonText,
  TestimonialsContainer,
  TestimonialItem,
  TestmonialInfo,
  TestimonialName,
  TestimonialBody,
} from './style';
import Swiper from 'react-native-swiper';
import Stars from '../../components/Stars';
import {Colors} from '../../shared/colors';

import FavoriteIcon from '../../assets/favorite.svg';
import FavoriteFullIcon from '../../assets/favorite_full.svg';
import BackIcon from '../../assets/back.svg';
import PrevIcon from '../../assets/nav_prev.svg';
import NextIcon from '../../assets/nav_next.svg';
import BarberModal from '../../components/BarberModal';
import { setFavorite } from '../../services/user.service';

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
    <Container>
      <BackButton onPress={handleBackButton}>
        <BackIcon width="44" height="44" fill={Colors.white} />
      </BackButton>

      <ScrollViewContainer>
        {userData.photos && userData.photos.length > 0 ? (
          <Swiper
            height={240}
            dot={<SwipeDot />}
            activeDot={<SwipeDotActive />}
            paginationStyle={{
              top: 15,
              right: 15,
              bottom: 200,
              left: 300,
            }}
            autoplay>
            {userData.photos.map((photos, key) => (
              <SwipeItem key={key}>
                <SwipeImage source={{uri: photos.url}} />
              </SwipeItem>
            ))}
          </Swiper>
        ) : (
          <FakeSwiper />
        )}

        <PageContainer>
          <UserInfoContainer>
            <UserAvatar source={{uri: routeParams.avatar}} />
            <UserInfo>
              <Name>{routeParams.name}</Name>
              <Stars rating={routeParams.stars} showRatingNumber />
            </UserInfo>

            <FavoriteButton onPress={handleFavorite} activeOpacity={0.7}>
              {favorited ? (
                <FavoriteFullIcon width="24" height="24" fill={Colors.red} />
              ) : (
                <FavoriteIcon width="24" height="24" fill={Colors.red} />
              )}
            </FavoriteButton>
          </UserInfoContainer>

          {loading && <LoadingIcon size="large" color={Colors.black} />}

          {userData.services && (
            <ServiceContainer>
              <Title>Lista de Serviços</Title>

              {userData.services.map((service, key) => (
                <ServiceItem key={key}>
                  <ServiceInfo>
                    <ServiceName>{service.name}</ServiceName>
                    <ServicePrice>R$ {service.price}</ServicePrice>
                 </ServiceInfo>

                  <ScheduleBarberButton
                    activeOpacity={0.7}
                    onPress={() => handleSchedule(key)}>
                    <ScheduleBarberButtonText>Agendar</ScheduleBarberButtonText>
                  </ScheduleBarberButton>
                </ServiceItem>
              ))}
            </ServiceContainer>
          )}

          {userData.testimonials && userData.testimonials.length > 0 && (
            <TestimonialsContainer>
              <Swiper
                style={{height: 110}}
                showsPagination={false}
                showsButtons
                prevButton={
                  <PrevIcon width="35" height="35" fill={Colors.black} />
                }
                nextButton={
                  <NextIcon width="35" height="35" fill={Colors.black} />
                }>
                {userData.testimonials.map((testimonial, key) => (
                  <TestimonialItem key={key}>
                    <TestmonialInfo>
                      <TestimonialName>{testimonial.name}</TestimonialName>
                      <Stars rating={testimonial.rate} />
                    </TestmonialInfo>
                    <TestimonialBody>{testimonial.body}</TestimonialBody>
                  </TestimonialItem>
                ))}
              </Swiper>
            </TestimonialsContainer>
          )}
        </PageContainer>
      </ScrollViewContainer>

      <BarberModal
        show={showModal}
        dismissButton={setShowModal}
        user={userData}
        service={selectedService}
      />
    </Container>
  );
};

export default Profile;
