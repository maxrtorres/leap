import React, {useEffect, useRef} from 'react';
import {
  Image,
  View,
  Text,
  TouchableWithoutFeedback,
  AppState,
  StyleSheet,
} from 'react-native';
import {getDimensions} from './game/utils/Utils';
import Sound from 'react-native-sound';
import frog from './assets/frog.png';

const {width, height} = getDimensions();
export const startMusic = new Sound(
  'fallen_leaves.mp3',
  Sound.MAIN_BUNDLE,
  error => {
    if (error) {
      console.log('start music', error);
    } else {
      startMusic.setNumberOfLoops(-1);
      startMusic.setVolume(0.5);
      startMusic.play();
    }
  },
);

const StartScreen = ({navigation}) => {
  const appState = useRef(AppState.currentState);

  _handleAppStateChange = nextAppState => {
    if (appState.current.match('active') && nextAppState === 'background') {
      startMusic.stop();
    } else if (
      appState.current.match('background') &&
      nextAppState === 'active'
    ) {
      startMusic.play();
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
    startMusic.play();
    return () => {
      startMusic.stop();
    };
  }, []);

  return (
    <TouchableWithoutFeedback onPress={() => navigation.replace('GameScreen')}>
      <View style={styles.container}>
        <Text style={styles.title}>Leap</Text>
        <Image source={frog} style={styles.image}></Image>
        <Text style={styles.highscore}>High Score: </Text>
        <Text style={styles.tap}>Tap to play!</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'black',
  },
  title: {
    textAlign: 'center',
    fontSize: 0.2 * width,
    color: 'white',
  },
  image: {
    width: width / 2,
    height: width / 2,
    resizeMode: 'contain',
    marginBottom: height * 0.03,
  },
  highscore: {
    textAlign: 'center',
    fontSize: 0.03 * width,
    color: 'white',
    marginBottom: 0.1 * height,
  },
  tap: {
    textAlign: 'center',
    fontSize: 0.05 * width,
    color: 'white',
  },
});

export default StartScreen;
