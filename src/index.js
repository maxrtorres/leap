import React, {PureComponent} from 'react';
import {StyleSheet, StatusBar, AppState, Alert} from 'react-native';
import {GameEngine} from 'react-native-game-engine';
import {Physics} from './game/systems/physics';
import {Jump} from './game/systems/jump';
import {Obstacle} from './game/systems/obstacle';
import {Entities} from './entities';

class App extends PureComponent {
  constructor() {
    super();
  }

  state = {
    appState: AppState.currentState,
    isRunning: true,
  };

  componentDidMount() {
    this.appStateSubscription = AppState.addEventListener(
      'change',
      nextAppState => {
        if (
          this.state.isRunning &&
          this.state.appState.match(/inactive|background/) &&
          nextAppState === 'active'
        ) {
          this.refs.gameEngine.start();
        } else if (
          this.state.isRunning &&
          this.state.appState.match(/inactive|active/) &&
          nextAppState === 'background'
        ) {
          this.refs.gameEngine.stop();
        }
        this.setState({appState: nextAppState});
      },
    );
  }

  componentWillUnmount() {
    this.appStateSubscription.remove();
  }

  render() {
    return (
      <GameEngine
        ref={'gameEngine'}
        style={styles.container}
        systems={[Physics, Jump, Obstacle]}
        entities={Entities()}
        onEvent={e => {
          switch (e) {
            case 'game-over':
              this.setState({isRunning: false});
              this.refs.gameEngine.stop();
              Alert.alert('Game over!', 'Play again?', [
                {
                  text: 'Play',
                  onPress: () => {
                    this.refs.gameEngine.swap(Entities());
                    this.setState({isRunning: true});
                    this.refs.gameEngine.start();
                  },
                  style: 'default',
                },
              ]);
          }
        }}>
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
