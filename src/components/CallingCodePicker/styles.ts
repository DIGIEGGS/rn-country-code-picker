import { Platform, StyleSheet } from 'react-native';
import { borderRadius, colors, spacing } from '../../theme';

const shadowStyle = StyleSheet.create({
  listContainer:
    Platform.OS === 'ios'
      ? {
          shadowColor: colors.black,
          shadowOpacity: 0.5,
          shadowRadius: 5,
          shadowOffset: { height: 2, width: 2 },
        }
      : {
          elevation: 3,
          overflow: 'hidden',
        },
});

export default StyleSheet.create({
  container: {
    position: 'relative',
  },
  listContainer: {
    ...shadowStyle.listContainer,
    position: 'absolute',
    top: 35,
    width: '100%',
    height: 300,
    paddingHorizontal: spacing.m,
    backgroundColor: colors.white,
    borderRadius: borderRadius.s,
  },
  list: {
    paddingVertical: spacing.s,
  },
  activityIndicatorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
