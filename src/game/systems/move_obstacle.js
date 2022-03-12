import Matter from 'matter-js';
import {getDimensions, genRandom} from '../utils/Utils';

const {width, height} = getDimensions();

export const MoveObstacle = (entities, {dispatch}) => {
  let obstacles = [entities.obstacle1.body, entities.obstacle2.body];
  obstacles.forEach(function (obstacle) {
    Matter.Body.setVelocity(obstacle, {
      x: -width * 0.025,
      y: 0,
    });
    if (obstacle.position.x < -0.2 * width) {
      let newY = genRandom(0, height * 0.75);
      Matter.Body.setPosition(obstacle, {
        x: width * 1.2,
        y: newY,
      });
      dispatch('add_point');
    }
  });
  return entities;
};
