import Matter from 'matter-js';
import {getDimensions, genRandom} from '../utils/Utils';
import Sound from 'react-native-sound';

const {width, height} = getDimensions();
const gameOverSound = new Sound('game_over.wav', Sound.MAIN_BUNDLE, error => {
  if (error) {
    console.log('game over sound', error);
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
    gameOverSound.play();
    dispatch('game-over');
  }
  return entities;
};
