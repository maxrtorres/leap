import React from 'react';
import {View, Modal, Text, Pressable} from 'react-native';
import styles from './dialog_style';

export default function Dialog(props) {
  const dialogVisible = props.dialogVisible;
  const setDialogVisible = props.setDialogVisible;
  const onPlay = props.onPlay;
  const onExit = props.onExit;

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={dialogVisible}
      onRequestClose={() => {
        setDialogVisible(false);
      }}>
      <View style={styles.container}>
        <View style={styles.dialog}>
          <Text style={[styles.text, styles.headerText]}>Game over!</Text>
          <Text style={[styles.text, styles.bodyText]}>Play again?</Text>
          <Pressable
            style={[styles.button, styles.buttonPlay]}
            onPress={() => {
              setDialogVisible(false);
              onPlay();
            }}>
            <Text style={[styles.text, styles.buttonText]}>Play</Text>
          </Pressable>
          <Pressable
            style={[styles.button, styles.buttonExit]}
            onPress={() => {
              setDialogVisible(false);
              onExit();
            }}>
            <Text style={[styles.text, styles.buttonText]}>Exit</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}
