import React, {PureComponent} from 'react';
import {StyleSheet, StatusBar} from 'react-native';
import {GameEngine} from 'react-native-game-engine';
import {Physics} from './game/systems/physics';
import {Jump} from './game/systems/jump';
import {Obstacle} from './game/systems/obstacle';
import {Entities} from './entities';

class App extends PureComponent {
  constructor() {
    super();
  }

  render() {
    return (
      <GameEngine
        style={styles.container}
        systems={[Physics, Jump, Obstacle]}
        entities={Entities()}>
        <StatusBar hidden={true} />
      </GameEngine>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
});

export default App;
