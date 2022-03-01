import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, Alert, AppState} from 'react-native';
import {GameEngine} from 'react-native-game-engine';
import {Physics} from '../systems/physics';
import {Jump} from '../systems/jump';
import {Obstacle} from '../systems/obstacle';
import {Entities} from '../entities/entities';
import {Colors} from '../values/colors';
import {gameMusic} from '../values/sounds';

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
      gameMusic.stop();
    } else if (
      running &&
      appState.current.match('background') &&
      nextAppState === 'active'
    ) {
      gameEngine.current.start();
      gameMusic.play();
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

  useEffect(() => {
    gameMusic.play();
    return () => {
      gameMusic.stop();
    };
  }, []);

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
            gameMusic.stop();
            Alert.alert('Game over!', 'Play again?', [
              {
                text: 'Play',
                onPress: () => {
                  setRunning(true);
                  gameEngine.current.swap(Entities());
                  gameEngine.current.start();
                  gameMusic.play();
                },
                style: 'default',
              },
              {
                text: 'Exit',
                onPress: () => {
                  navigation.replace('StartScreen');
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
    backgroundColor: Colors.backgroundColor,
  },
});

export default GameScreen;
