import { StyleSheet } from 'react-native';

import { colors, spacing } from '../../theme';

export default StyleSheet.create({
  container: {
    position: 'relative',
  },
  searchIconContainer: {
    position: 'absolute',
    left: 0,
    top: 12,
  },
  input: {
    paddingLeft: spacing.xl,
    borderBottomColor: colors.greyLight,
    borderBottomWidth: 1,
  },
  clearContainer: {
    position: 'absolute',
    right: 0,
    top: 10,
    backgroundColor: colors.greyLight,
    borderRadius: 12,
    padding: 2,
  },
});
