import React, {useEffect, useRef} from 'react';
import {
  Image,
  View,
  Text,
  TouchableWithoutFeedback,
  AppState,
  StyleSheet,
  Animated,
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
  const bounceAnim = useRef(new Animated.Value(0)).current;

  const bounce = Animated.sequence([
    Animated.timing(bounceAnim, {
      toValue: -0.01 * height,
      duration: 500,
      useNativeDriver: true,
    }),
    Animated.timing(bounceAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }),
  ]);

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
    Animated.loop(bounce, {iterations: -1}).start();
    return () => {
      startMusic.stop();
    };
  }, []);

  return (
    <TouchableWithoutFeedback onPress={() => navigation.replace('GameScreen')}>
      <View style={styles.container}>
        <Text style={styles.title}>Leap</Text>
        <Text style={styles.highscore}>High Score: </Text>
        <Animated.View style={{transform: [{translateY: bounceAnim}]}}>
          <Image source={frog} style={styles.image}></Image>
          <Text style={styles.tap}>Tap to play!</Text>
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'green',
  },
  title: {
    textAlign: 'center',
    fontSize: 0.2 * width,
    color: 'white',
    fontFamily: 'sans-serif-condensed',
    marginBottom: 0.05 * height,
  },
  highscore: {
    textAlign: 'center',
    fontSize: 0.05 * width,
    color: 'white',
    fontFamily: 'sans-serif-condensed',
  },
  image: {
    width: width / 2,
    height: width / 2,
    resizeMode: 'contain',
    marginBottom: height * 0.05,
  },
  tap: {
    textAlign: 'center',
    fontSize: 0.05 * width,
    color: 'white',
    fontFamily: 'sans-serif-condensed',
  },
});

export default StartScreen;
