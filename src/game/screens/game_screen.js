import React, {useState, useEffect, useRef} from 'react';
import {AppState, ImageBackground, StatusBar, Text} from 'react-native';
import {GameEngine} from 'react-native-game-engine';
import {Systems} from '../systems/systems';
import {Entities} from '../entities/entities';
import {gameMusic} from '../values/sounds';
import {loseSound} from '../values/sounds';
import backgroundImage from '../../assets/background.png';
import {updateHighScore} from '../utils/Utils';
import styles from './game_screen_style';
import Dialog from '../components/dialog';

const GameScreen = ({navigation}) => {
  const gameEngine = useRef(null);
  const appState = useRef(AppState.currentState);
  const [running, setRunning] = useState(true);
  const [score, setScore] = useState(0);
  const [dialogVisible, setDialogVisible] = useState(false);

  const onPlay = () => {
    setScore(0);
    setRunning(true);
    gameEngine.current.swap(Entities());
    gameEngine.current.start();
    loseSound.stop();
    gameMusic.play();
  };

  const onExit = () => {
    navigation.replace('StartScreen');
  };

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
      <Dialog
        dialogVisible={dialogVisible}
        setDialogVisible={setDialogVisible}
        onPlay={onPlay}
        onExit={onExit}
      />
      <StatusBar translucent={true} hidden={true} />
      <Text style={styles.score}>{score}</Text>
      <GameEngine
        ref={gameEngine}
        style={styles.container}
        systems={Systems()}
        entities={Entities()}
        onEvent={e => {
          switch (e) {
            case 'add_point':
              setScore(score + 1);
              break;
            case 'game-over':
              updateHighScore(score);
              setRunning(false);
              gameEngine.current.stop();
              gameMusic.stop();
              loseSound.play();
              setDialogVisible(true);
          }
        }}></GameEngine>
    </ImageBackground>
  );
};

export default GameScreen;
