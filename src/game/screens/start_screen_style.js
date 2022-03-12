import {StyleSheet} from 'react-native';
import {Colors} from '../values/colors';
import {getDimensions} from '../utils/Utils';

const {width, height} = getDimensions();

export default styles = StyleSheet.create({
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
