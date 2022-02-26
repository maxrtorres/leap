import Matter, {Body} from 'matter-js';
import Sound from 'react-native-sound';
import {getDimensions} from '../utils/Utils';

const {width, height} = getDimensions();
const jumpSound = new Sound('jump.wav', Sound.MAIN_BUNDLE, error => {
  if (error) {
    console.log('jump sound', error);
  }
});

export const Jump = (entities, {touches}) => {
  let playerBox = entities.playerBox.body;
  Body.applyForce(playerBox, playerBox.position, {
    x: 0,
    y: height * 0.000005,
  });
  touches
    .filter(t => t.type === 'press')
    .forEach(t => {
      {
        Matter.Body.setVelocity(playerBox, {
          x: 0,
          y: -height * 0.03,
        });
        jumpSound.play();
      }
    });

  return entities;
};
