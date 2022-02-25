import React, {useEffect, useRef} from 'react';
import {View, Text, TouchableWithoutFeedback, AppState} from 'react-native';
import {getDimensions} from './game/utils/Utils';
import Sound from 'react-native-sound';

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
      <View
        style={{
          justifyContent: 'center',
          flex: 1,
          backgroundColor: 'black',
        }}>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 0.2 * width,
            color: 'white',
            marginBottom: 0.1 * height,
          }}>
          Leap
        </Text>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 0.05 * width,
            color: 'white',
          }}>
          Tap to play!
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default StartScreen;
