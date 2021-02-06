import { StyleSheet } from 'react-native';

import { borderRadii, spacing } from '../../theme';

export default StyleSheet.create({
  container: {
    width: 40,
    height: 30,
    borderRadius: borderRadii.s,
    marginRight: spacing.s,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
