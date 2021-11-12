import { StyleSheet } from 'react-native';
import { colors, spacing } from '../../theme';

export default StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'space-between',
    alignSelf: 'center',
    flexDirection: 'row',
  },
  searchIconContainer: {
    alignSelf: 'center',
  },
  input: {
    marginHorizontal: spacing.s,
    marginVertical: spacing.s,
    fontSize: 17,
    flex: 1,
  },
  clearContainer: {
    backgroundColor: colors.greyLight,
    height: 20,
    width: 20,
    borderRadius: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
