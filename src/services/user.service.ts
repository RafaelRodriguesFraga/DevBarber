import AsyncStorage from "@react-native-async-storage/async-storage";
import { Appointment } from "../models/appointment";
import { axiosPost } from "../shared/axiosFunctions";

export const setFavorite = async (id: number) => {
    const token = await AsyncStorage.getItem('token');
    const endpoint = '/user/favorite'; 
  
    try {
      const response = await axiosPost(endpoint, {id, token});
      return response;
    } catch (error) {
      throw error;
    }
  };
  
  export const setAppointment = async (appointment: Appointment) => {
    const token = await AsyncStorage.getItem('token');
    const endpoint = '/user/appointment';
  
    try {
      const response = await axiosPost(endpoint, {token, appointment});
      return response;
    } catch (error) {
      throw error;
    }
  };
  