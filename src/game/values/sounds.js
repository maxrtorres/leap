import Sound from 'react-native-sound';

export const startMusic = new Sound('start.ogg', Sound.MAIN_BUNDLE, error => {
  if (error) {
    console.log('start music', error);
  } else {
    startMusic.setNumberOfLoops(-1);
    startMusic.setVolume(1);
    startMusic.play();
  }
});

export const gameMusic = new Sound('game.wav', Sound.MAIN_BUNDLE, error => {
  if (error) {
    console.log('game music', error);
  } else {
    gameMusic.setNumberOfLoops(-1);
    gameMusic.setVolume(1);
  }
});

export const jumpSound = new Sound('jump.wav', Sound.MAIN_BUNDLE, error => {
  if (error) {
    console.log('jump sound', error);
  } else {
    jumpSound.setVolume(0.5);
  }
});

export const loseSound = new Sound('lose.wav', Sound.MAIN_BUNDLE, error => {
  if (error) {
    console.log('lose sound', error);
  } else {
    loseSound.setVolume(0.5);
  }
});
