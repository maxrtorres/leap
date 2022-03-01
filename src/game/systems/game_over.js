import Matter from 'matter-js';
import {loseSound} from '../values/sounds';

export const GameOver = (entities, {dispatch}) => {
  let obstacle = entities.obstacle.body;
  let playerBox = entities.playerBox.body;
  let collision = Matter.Collision.collides(playerBox, obstacle);
  if (collision != null) {
    loseSound.play();
    dispatch('game-over');
  }
  return entities;
};
