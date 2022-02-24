import Matter from 'matter-js';
import {getDimensions} from '../utils/Utils';
import Sound from 'react-native-sound';

const {width, height} = getDimensions();
const gameOverSound = new Sound('game_over.mp3', Sound.MAIN_BUNDLE, error => {
  if (error) {
    console.log('game over sound', error);
  }
});

export const Obstacle = (entities, {dispatch}) => {
  let obstacle = entities.obstacle.body;
  Matter.Body.setVelocity(obstacle, {
    x: -5,
    y: 0,
  });
  if (obstacle.position.x < -0.2 * width) {
    Matter.Body.setPosition(obstacle, {
      x: width * 1.2,
      y: obstacle.position.y,
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
