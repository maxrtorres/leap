import Matter from 'matter-js';

export const GameOver = (entities, {dispatch}) => {
  let player = entities.player.body;
  let obstacle1 = entities.obstacle1.body;
  let obstacle2 = entities.obstacle2.body;
  let ceiling = entities.ceiling.body;
  let floor = entities.floor.body;
  let objects = [obstacle1, obstacle2, ceiling, floor];

  objects.forEach(function (object) {
    let collision = Matter.Collision.collides(player, object);
    if (collision != null) {
      dispatch('game-over');
      return entities;
    }
  });

  return entities;
};
