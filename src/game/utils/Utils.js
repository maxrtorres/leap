import {Dimensions} from 'react-native';

export const getDimensions = () => {
  return Dimensions.get('screen');
};

export const genRandom = (low, high) => {
  return Math.random() * (high - low + 1) + low;
};
