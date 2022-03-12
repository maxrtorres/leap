import {StyleSheet} from 'react-native';
import {Colors} from '../values/colors';
import {getDimensions} from '../utils/Utils';

const {width, height} = getDimensions();

export default styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
  },
  score: {
    position: 'absolute',
    width: width,
    marginTop: height * 0.03,
    textAlign: 'center',
    fontSize: height * 0.04,
    fontFamily: 'Pixel',
    color: Colors.textColor,
  },
  container: {
    flex: 1,
  },
});
