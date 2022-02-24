import {Dimensions, Alert} from 'react-native';
import {Entities} from '../../entities';

export const getDimensions = () => {
  return Dimensions.get('screen');
};

export const gameOver = gameRef => {
  gameRef.stop();
  Alert.alert('Game over!', 'Play again?', [
    {
      text: 'Play',
      onPress: () => {
        gameRef.swap(Entities());
        gameRef.start();
      },
      style: 'default',
    },
  ]);
};
