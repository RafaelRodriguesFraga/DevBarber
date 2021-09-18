import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeUserProperties = async (name: string, email: string) => {
  await AsyncStorage.multiSet([
    ['email', JSON.stringify(email)],
    ['name', JSON.stringify(name)],
  ]);
};
