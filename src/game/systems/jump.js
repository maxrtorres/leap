import Matter from 'matter-js';
import {getDimensions} from '../utils/Utils';
import {jumpSound} from '../values/sounds';

const {width, height} = getDimensions();

export const Jump = (entities, {touches}) => {
  let player = entities.player.body;
  touches
    .filter(t => t.type === 'press')
    .forEach(t => {
      {
        Matter.Body.setVelocity(player, {
          x: 0,
          y: -25,
        });
        jumpSound.play();
      }
    });
  return entities;
};
