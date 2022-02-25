import React from 'react';
import {View, Text, TouchableWithoutFeedback} from 'react-native';
import {getDimensions} from './game/utils/Utils';

const {width, height} = getDimensions();

const StartScreen = ({navigation}) => {
  return (
    <TouchableWithoutFeedback
      onPress={() =>
        navigation.reset({
          index: 0,
          routes: [{name: 'GameScreen'}],
        })
      }>
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
