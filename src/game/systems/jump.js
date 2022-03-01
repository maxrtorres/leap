import Matter, {Body} from 'matter-js';
import {getDimensions} from '../utils/Utils';
import {jumpSound} from '../values/sounds';

const {width, height} = getDimensions();

export const Jump = (entities, {touches}) => {
  let playerBox = entities.playerBox.body;
  Body.applyForce(playerBox, playerBox.position, {
    x: 0,
    y: height * 0.000003,
  });
  touches
    .filter(t => t.type === 'press')
    .forEach(t => {
      {
        Matter.Body.setVelocity(playerBox, {
          x: 0,
          y: -height * 0.025,
        });
        jumpSound.play();
      }
    });

  return entities;
};
