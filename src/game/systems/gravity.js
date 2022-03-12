import {Body} from 'matter-js';
import {getDimensions} from '../utils/Utils';

const {width, height} = getDimensions();

export const Gravity = entities => {
  let player = entities.player.body;
  let objects = [player];
  objects.forEach(function (object) {
    Body.applyForce(object, object.position, {
      x: 0,
      y: height * 0.0000012,
    });
  });
  return entities;
};
