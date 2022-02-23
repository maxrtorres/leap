import Matter from 'matter-js';
import {getDimensions} from '../utils/Utils';

const {width, height} = getDimensions();

export const Obstacle = entities => {
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
  return entities;
};
