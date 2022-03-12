import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  AppState,
  Animated,
  ImageBackground,
  StatusBar,
} from 'react-native';
import {getDimensions, getData} from '../utils/Utils';
import playerImage from '../../assets/player.png';
import {startMusic} from '../values/sounds';
import backgroundImage from '../../assets/background.png';
import styles from './start_screen_style';

const {width, height} = getDimensions();

const StartScreen = ({navigation}) => {
  const appState = useRef(AppState.currentState);
  const bounceAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0.2)).current;
  const [highScore, setHighScore] = useState('0');

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

  const fade = Animated.sequence([
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }),
    Animated.timing(fadeAnim, {
      toValue: 0.2,
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
    const getHighScore = async () => {
      const score = await getData('high_score');
      setHighScore(score);
    };
    getHighScore();
    startMusic.play();
    Animated.loop(bounce, {iterations: -1}).start();
    Animated.loop(fade, {iterations: -1}).start();
    return () => {
      startMusic.stop();
    };
  }, []);

  return (
    <ImageBackground
      source={backgroundImage}
      resizeMode="cover"
      style={styles.background}>
      <StatusBar translucent={true} hidden={true} />
      <TouchableWithoutFeedback
        onPress={() => navigation.replace('GameScreen')}>
        <View style={styles.container}>
          <Text style={styles.title}>Leap</Text>
          <Text style={styles.highscore}>High Score: </Text>
          <Text style={styles.highscore}>{highScore}</Text>
          <Animated.Image
            source={playerImage}
            style={[styles.image, {transform: [{translateY: bounceAnim}]}]}
          />
          <Animated.Text style={[styles.tap, {opacity: fadeAnim}]}>
            Tap to play!
          </Animated.Text>
        </View>
      </TouchableWithoutFeedback>
    </ImageBackground>
  );
};

export default StartScreen;
