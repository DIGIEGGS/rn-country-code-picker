import { StyleSheet } from 'react-native';

import { colors, spacing } from '../../theme';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: spacing.m,
    marginBottom: spacing.m,
    borderBottomColor: colors.grey,
    borderBottomWidth: 1,
  },
  imageContainer: {
    width: 40,
    height: 30,
    borderRadius: 4,
    marginRight: spacing.m,
  },
  codeContainer: {
    width: 60,
    marginRight: spacing.m,
  },
});
