import React, {useEffect, useRef} from 'react';
import {
  Image,
  View,
  Text,
  TouchableWithoutFeedback,
  AppState,
  StyleSheet,
  Animated,
  ImageBackground,
  StatusBar,
} from 'react-native';
import {getDimensions} from '../utils/Utils';
import playerImage from '../../assets/player.png';
import {Colors} from '../values/colors';
import {startMusic} from '../values/sounds';
import backgroundImage from '../../assets/background.png';

const {width, height} = getDimensions();

const StartScreen = ({navigation}) => {
  const appState = useRef(AppState.currentState);
  const bounceAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0.2)).current;

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

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  title: {
    textAlign: 'center',
    fontSize: 0.2 * width,
    color: Colors.textColor,
    fontFamily: 'Pixel',
    marginBottom: 0.05 * height,
  },
  highscore: {
    textAlign: 'center',
    fontSize: 0.05 * width,
    color: Colors.textColor,
    fontFamily: 'Pixel',
    marginBottom: height * 0.05,
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
    color: Colors.textColor,
    fontFamily: 'Pixel',
  },
});

export default StartScreen;
