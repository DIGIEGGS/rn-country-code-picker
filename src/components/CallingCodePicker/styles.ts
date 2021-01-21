import { StyleSheet } from 'react-native';

import { borderRadii, colors, spacing } from '../../theme';

export default StyleSheet.create({
  container: {
    position: 'relative',
  },
  listContainer: {
    position: 'absolute',
    top: 45,
    width: '100%',
    height: 300,
    paddingHorizontal: spacing.m,
    overflow: 'hidden',
    backgroundColor: colors.white,
    borderRadius: borderRadii.s,
    elevation: 3,
  },
  list: {
    paddingVertical: spacing.s,
  },
});
