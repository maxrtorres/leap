import {Body} from 'matter-js';
import {getDimensions} from '../utils/Utils';

const {width, height} = getDimensions();

export const Gravity = entities => {
  let playerBox = entities.playerBox.body;
  Body.applyForce(playerBox, playerBox.position, {
    x: 0,
    y: height * 0.000002,
  });
  return entities;
};
