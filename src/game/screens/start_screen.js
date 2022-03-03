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
import {getDimensions} from '../utils/Utils';
import playerImage from '../../assets/player.png';
import {Colors} from '../values/colors';
import {startMusic} from '../values/sounds';

const {width, height} = getDimensions();

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
          <Image source={playerImage} style={styles.image}></Image>
        </Animated.View>
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
    backgroundColor: Colors.backgroundColor,
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
