import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {Alert} from 'react-native';

export const api = axios.create({
  baseURL: 'https://api.b7web.com.br/devbarber/api',
});

export async function axiosGet(endpoint: string) {
  try {
    const response = await api.get(endpoint, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    return response;
  } catch (error) {
    throw error;
  }
}

export async function axiosPost(endpoint: string, body: any = null) {
  const jsonBody = !!body ? JSON.stringify(body) : null;

  try {
    const response = await api.post(endpoint, jsonBody, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'aplication/json',
      },
    });

    return response;
  } catch (error) {
    console.error(error);

    throw error;
  }
}
