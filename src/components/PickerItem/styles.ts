import { StyleSheet } from 'react-native';
import { colors, spacing } from '../../theme';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: spacing.s,
  },
  imageContainer: {
    alignSelf: 'center',
  },
  codeContainer: {
    alignSelf: 'center',
  },
  textStyle: { alignSelf: 'center' },
});
