import {Body} from 'matter-js';
import {getDimensions} from '../utils/Utils';

const {width, height} = getDimensions();

export const Gravity = entities => {
  let player = entities.player.body;
  let obstacle1 = entities.obstacle1.body;
  let obstacle2 = entities.obstacle2.body;
  let objects = [player, obstacle1, obstacle2];
  objects.forEach(function (object) {
    Body.applyForce(object, object.position, {
      x: 0,
      y: height * 0.0000012,
    });
  });
  return entities;
};
