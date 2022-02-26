import React from 'react';
import {View, Image, StyleSheet} from 'react-native';

export default function Box(props) {
  const width = props.size[0];
  const height = props.size[1];
  const x = props.body.position.x - width / 2;
  const y = props.body.position.y - height / 2;
  const image = props.image;

  return (
    <View
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: width,
        height: height,
        backgroundColor: props.color || 'black',
      }}>
      {image != null && <Image source={image} style={styles.image} />}
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'contain',
  },
});
