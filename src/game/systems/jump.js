import Matter from 'matter-js';

export const Jump = (entities, {touches}) => {
  touches
    .filter(t => t.type === 'press')
    .forEach(t => {
      let playerBox = entities.playerBox.body;
      Matter.Body.setVelocity(playerBox, {
        x: 0,
        y: -20,
      });
    });
  return entities;
};
