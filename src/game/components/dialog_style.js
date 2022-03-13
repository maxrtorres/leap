import {StyleSheet} from 'react-native';
import {Colors} from '../values/colors';
import {getDimensions} from '../utils/Utils';

const {width, height} = getDimensions();

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dialog: {
    backgroundColor: Colors.dialogBackgroundColor,
    borderRadius: 0.04 * height,
    padding: 0.03 * height,
    alignItems: 'center',
    elevation: 0.005 * height,
    width: 0.75 * width,
  },
  text: {
    fontFamily: 'Pixel',
    textAlign: 'center',
  },
  headerText: {
    marginBottom: 0.02 * height,
    color: Colors.dialogTextColor,
    fontSize: 0.03 * height,
  },
  bodyText: {
    marginBottom: 0.03 * height,
    color: Colors.dialogTextColor,
    fontSize: 0.02 * height,
  },
  button: {
    borderRadius: 0.02 * height,
    padding: 0.02 * height,
    elevation: 0.005 * height,
    width: 0.4 * width,
  },
  buttonPlay: {
    backgroundColor: Colors.buttonPlayColor,
    marginBottom: 0.02 * height,
  },
  buttonExit: {
    backgroundColor: Colors.buttonExitColor,
  },
  buttonText: {
    color: Colors.defaultTextColor,
  },
});
