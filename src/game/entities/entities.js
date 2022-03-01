import {getDimensions, genRandom} from '../utils/Utils';
import Box from '../components/box';
import Matter from 'matter-js';
import frog from '../../assets/frog.png';
import {Colors} from '../values/colors';

export const Entities = () => {
  const {width, height} = getDimensions();
  const boxSize = Math.trunc(height * 0.05);
  const playerBox = Matter.Bodies.rectangle(
    width * 0.25,
    height * 0.3,
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
    height * 0.3,
    {
      isStatic: true,
    },
  );
  const obstacle1 = Matter.Bodies.rectangle(
    width * 1.2,
    genRandom(0, height * 0.75),
    boxSize,
    boxSize,
    {
      friction: 0,
    },
  );
  const obstacle2 = Matter.Bodies.rectangle(
    width * 1.7,
    genRandom(0, height * 0.75),
    boxSize,
    boxSize,
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
  Matter.World.add(world, [playerBox, ceiling, floor, obstacle1, obstacle2]);

  return {
    physics: physics,
    playerBox: {
      body: playerBox,
      size: [boxSize, boxSize],
      color: Colors.playerColor,
      renderer: Box,
      image: frog,
    },
    ceiling: {
      body: ceiling,
      size: [width * 5, boxSize],
      color: Colors.ceilingColor,
      renderer: Box,
    },
    floor: {
      body: floor,
      size: [width * 5, height * 0.3],
      color: Colors.floorColor,
      renderer: Box,
    },
    obstacle1: {
      body: obstacle1,
      size: [boxSize, boxSize],
      color: Colors.obstacleColor,
      renderer: Box,
    },
    obstacle2: {
      body: obstacle2,
      size: [boxSize, boxSize],
      color: Colors.obstacleColor,
      renderer: Box,
    },
  };
};
