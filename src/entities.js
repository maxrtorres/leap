import {getDimensions} from './game/utils/Utils';
import Box from './game/components/box';
import Matter from 'matter-js';
import frog from './assets/frog.png';

export const Entities = () => {
  const {width, height} = getDimensions();
  const boxSize = Math.trunc(height * 0.05);
  const playerBox = Matter.Bodies.rectangle(
    width * 0.25,
    height * 0.75,
    boxSize,
    boxSize,
    {
      friction: 0,
    },
  );
  const ceiling = Matter.Bodies.rectangle(
    width * 0.5,
    -boxSize * 0.5,
    width * 5,
    boxSize,
    {
      isStatic: true,
    },
  );
  const floor = Matter.Bodies.rectangle(
    width * 0.5,
    height,
    width * 5,
    height * 0.5,
    {
      isStatic: true,
    },
  );
  const obstacle = Matter.Bodies.rectangle(
    width * 1.2,
    height * 0.75,
    boxSize,
    height * 0.25,
    {
      friction: 0,
    },
  );

  const engine = Matter.Engine.create({
    enableSleeping: false,
    gravity: {x: 0, y: 0},
  });
  const world = engine.world;
  const physics = {engine: engine, world, world};
  Matter.World.add(world, [playerBox, ceiling, floor, obstacle]);

  return {
    physics: physics,
    playerBox: {
      body: playerBox,
      size: [boxSize, boxSize],
      color: 'transparent',
      renderer: Box,
      image: frog,
    },
    ceiling: {
      body: ceiling,
      size: [width * 5, boxSize],
      color: 'transparent',
      renderer: Box,
    },
    floor: {
      body: floor,
      size: [width * 5, height * 0.5],
      color: 'green',
      renderer: Box,
    },
    obstacle: {
      body: obstacle,
      size: [boxSize, height * 0.25],
      color: '#964B00',
      renderer: Box,
    },
  };
};
