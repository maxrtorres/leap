import Matter from 'matter-js';
import {jumpSound} from '../values/sounds';
import {getDimensions} from '../utils/Utils';

const {width, height} = getDimensions();

export const Jump = (entities, {touches}) => {
  let player = entities.player.body;
  touches
    .filter(t => t.type === 'press')
    .forEach(t => {
      {
        Matter.Body.setVelocity(player, {
          x: 0,
          y: height * -0.015,
        });
        jumpSound.play();
      }
    });
  return entities;
};
