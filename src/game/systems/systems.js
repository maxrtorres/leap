import {Jump} from './jump';
import {MoveObstacle} from './move_obstacle';
import {GameOver} from './game_over';
import {Physics} from './physics';
import {Gravity} from './gravity';

export const Systems = () => {
  return [Physics, Jump, MoveObstacle, GameOver, Gravity];
};
