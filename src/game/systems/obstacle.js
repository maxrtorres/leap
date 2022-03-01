import Matter from 'matter-js';
import {getDimensions, genRandom} from '../utils/Utils';
import Sound from 'react-native-sound';

const {width, height} = getDimensions();
const loseSound = new Sound('lose.wav', Sound.MAIN_BUNDLE, error => {
  if (error) {
    console.log('lose sound', error);
  } else {
    loseSound.setVolume(0.1);
  }
});

export const Obstacle = (entities, {dispatch}) => {
  let obstacle = entities.obstacle.body;
  Matter.Body.setVelocity(obstacle, {
    x: -width * 0.02,
    y: 0,
  });
  if (obstacle.position.x < -0.2 * width) {
    let newY = genRandom(0, height * 0.75);
    Matter.Body.setPosition(obstacle, {
      x: width * 1.2,
      y: newY,
    });
  }
  let playerBox = entities.playerBox.body;
  let collision = Matter.Collision.collides(playerBox, obstacle);
  if (collision != null) {
    loseSound.play();
    dispatch('game-over');
  }
  return entities;
};
