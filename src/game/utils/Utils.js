import {Dimensions} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getDimensions = () => {
  return Dimensions.get('screen');
};

export const genRandom = (low, high) => {
  return Math.random() * (high - low + 1) + low;
};

export const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.log(e);
  }
};

export const getData = async key => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value;
    }
    return '0';
  } catch (e) {
    return '0';
  }
};
