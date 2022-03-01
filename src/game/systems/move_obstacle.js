import Matter from 'matter-js';
import {getDimensions, genRandom} from '../utils/Utils';

const {width, height} = getDimensions();

export const MoveObstacle = entities => {
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
  return entities;
};
