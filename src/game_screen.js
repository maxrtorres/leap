import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, Alert, AppState} from 'react-native';
import {GameEngine} from 'react-native-game-engine';
import {Physics} from './game/systems/physics';
import {Jump} from './game/systems/jump';
import {Obstacle} from './game/systems/obstacle';
import {Entities} from './entities';

const GameScreen = ({navigation}) => {
  const gameEngine = useRef(null);
  const appState = useRef(AppState.currentState);
  const [running, setRunning] = useState(true);

  _handleAppStateChange = nextAppState => {
    if (
      running &&
      appState.current.match('active') &&
      nextAppState === 'background'
    ) {
      gameEngine.current.stop();
    } else if (
      running &&
      appState.current.match('background') &&
      nextAppState === 'active'
    ) {
      gameEngine.current.start();
    }
    appState.current = nextAppState;
  };

  useEffect(() => {
    let subscription = AppState.addEventListener(
      'change',
      _handleAppStateChange,
    );
    return () => {
      subscription.remove();
    };
  });

  return (
    <GameEngine
      ref={gameEngine}
      style={styles.container}
      systems={[Physics, Jump, Obstacle]}
      entities={Entities()}
      onEvent={e => {
        switch (e) {
          case 'game-over':
            setRunning(false);
            gameEngine.current.stop();
            Alert.alert('Game over!', 'Play again?', [
              {
                text: 'Play',
                onPress: () => {
                  setRunning(true);
                  gameEngine.current.swap(Entities());
                  gameEngine.current.start();
                },
                style: 'default',
              },
              {
                text: 'Exit',
                onPress: () => {
                  navigation.reset({
                    index: 0,
                    routes: [{name: 'StartScreen'}],
                  });
                },
                style: 'destructive',
              },
            ]);
        }
      }}></GameEngine>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
});

export default GameScreen;
