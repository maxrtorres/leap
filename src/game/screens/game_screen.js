import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, Alert, AppState, ImageBackground} from 'react-native';
import {GameEngine} from 'react-native-game-engine';
import {Systems} from '../systems/systems';
import {Entities} from '../entities/entities';
import {Colors} from '../values/colors';
import {gameMusic} from '../values/sounds';
import {loseSound} from '../values/sounds';
import backgroundImage from '../../assets/background.png';

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
    } else {
      loseSound.stop();
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
      loseSound.stop();
    };
  }, []);

  return (
    <ImageBackground
      source={backgroundImage}
      resizeMode="cover"
      style={styles.background}>
      <GameEngine
        ref={gameEngine}
        style={styles.container}
        systems={Systems()}
        entities={Entities()}
        onEvent={e => {
          switch (e) {
            case 'game-over':
              setRunning(false);
              gameEngine.current.stop();
              gameMusic.stop();
              loseSound.play();
              Alert.alert('Game over!', 'Play again?', [
                {
                  text: 'Play',
                  onPress: () => {
                    setRunning(true);
                    gameEngine.current.swap(Entities());
                    gameEngine.current.start();
                    loseSound.stop();
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
        }}
      />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
  },
  container: {
    flex: 1,
  },
});

export default GameScreen;
