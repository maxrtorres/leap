import {getDimensions, genRandom} from '../utils/Utils';
import Box from '../components/box';
import Matter from 'matter-js';
import playerImage from '../../assets/player.png';
import obstacleImage from '../../assets/obstacle.png';
import floorImage from '../../assets/floor.png';
import {Colors} from '../values/colors';

export const Entities = () => {
  const {width, height} = getDimensions();
  const playerHeight = Math.trunc(height * 0.05);
  const player = Matter.Bodies.circle(
    width * 0.25,
    height * 0.3,
    playerHeight / 2,
    {
      friction: 0,
    },
  );
  const ceiling = Matter.Bodies.rectangle(
    width * 0.5,
    -playerHeight * 0.5,
    width * 5,
    playerHeight,
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
  const obstacle1 = Matter.Bodies.circle(
    width * 1.2,
    genRandom(0, height * 0.75),
    playerHeight / 2,
    {
      friction: 0,
    },
  );
  const obstacle2 = Matter.Bodies.circle(
    width * 1.9,
    genRandom(0, height * 0.75),
    playerHeight / 2,
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
  Matter.World.add(world, [player, ceiling, floor, obstacle1, obstacle2]);

  return {
    physics: physics,
    playerBox: {
      body: player,
      size: [playerHeight, playerHeight],
      color: Colors.playerColor,
      renderer: Box,
      image: playerImage,
    },
    ceiling: {
      body: ceiling,
      size: [width * 5, playerHeight],
      color: Colors.ceilingColor,
      renderer: Box,
    },
    floor: {
      body: floor,
      size: [width * 5, height * 0.3],
      color: Colors.floorColor,
      renderer: Box,
      image: floorImage,
    },
    obstacle1: {
      body: obstacle1,
      size: [playerHeight, playerHeight],
      color: Colors.obstacleColor,
      renderer: Box,
      image: obstacleImage,
    },
    obstacle2: {
      body: obstacle2,
      size: [playerHeight, playerHeight],
      color: Colors.obstacleColor,
      renderer: Box,
      image: obstacleImage,
    },
  };
};
