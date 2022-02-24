import Matter from 'matter-js';
import Sound from 'react-native-sound';
import {getDimensions} from '../utils/Utils';

const {width, height} = getDimensions();
const jumpSound = new Sound('jump.mp3', Sound.MAIN_BUNDLE, error => {
  if (error) {
    console.log('jump sound', error);
  }
});

export const Jump = (entities, {touches}) => {
  touches
    .filter(t => t.type === 'press')
    .forEach(t => {
      let playerBox = entities.playerBox.body;
      Matter.Body.setVelocity(playerBox, {
        x: 0,
        y: -height / 50,
      });
      jumpSound.play();
    });
  return entities;
};
