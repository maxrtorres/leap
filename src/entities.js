import {getDimensions} from './game/utils/Utils';
import Box from './game/components/box';
import Matter from 'matter-js';

const {width, height} = getDimensions();
const boxSize = Math.trunc(height * 0.05);
const playerBox = Matter.Bodies.rectangle(
  width * (1 / 4),
  height * (3 / 4),
  boxSize,
  boxSize,
  {
    friction: 0,
  },
);
const ceiling = Matter.Bodies.rectangle(
  width / 2,
  boxSize,
  width * 2,
  boxSize,
  {
    isStatic: true,
  },
);
const floor = Matter.Bodies.rectangle(
  width / 2,
  height,
  width * 2,
  height / 2,
  {
    isStatic: true,
  },
);
const obstacle = Matter.Bodies.rectangle(
  width * 1.2,
  height * (3 / 4),
  boxSize,
  boxSize,
  {
    friction: 0,
  },
);

const engine = Matter.Engine.create({enableSleeping: false});
const world = engine.world;
const physics = {engine: engine, world, world};
Matter.World.add(world, [playerBox, ceiling, floor, obstacle]);

export const Entities = () => {
  return {
    physics: physics,
    playerBox: {
      body: playerBox,
      size: [boxSize, boxSize],
      color: 'red',
      renderer: Box,
    },
    ceiling: {
      body: ceiling,
      size: [width * 2, boxSize],
      color: 'transparent',
      renderer: Box,
    },
    floor: {
      body: floor,
      size: [width * 2, height / 2],
      color: 'green',
      renderer: Box,
    },
    obstacle: {
      body: obstacle,
      size: [boxSize, boxSize],
      color: 'blue',
      renderer: Box,
    },
  };
};
