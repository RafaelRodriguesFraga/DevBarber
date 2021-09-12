import {axiosGet, axiosPost} from '../shared/axiosFunctions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Location } from '../models/location';


export const getBarbers = async (lat?: string, lng?: string, address?: string) => {
  const token = await AsyncStorage.getItem('token');
  const endpoint = `/barbers?token=${token}&lat=${lat}&lng=${lng}&address=${address}`;

  try {
    const response = await axiosGet(endpoint);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getBarberProfile = async (id: number) => {
  const token = await AsyncStorage.getItem('token');
  const endpoint = `/barber/${id}?token=${token}`;

  try {
    const response = axiosGet(endpoint);
    return response;
  } catch (err) {
    console.error(err.message);
  }
};