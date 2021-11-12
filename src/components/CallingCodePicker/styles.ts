import { useMemo } from 'react';
import { Platform, StyleSheet } from 'react-native';
import { borderRadius, colors, MODAL_SIZE, spacing } from '../../theme';

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

const styles = (y: number) =>
  useMemo(
    () =>
      StyleSheet.create({
        keyboardAvoidingView: {
          position: 'absolute',
          alignSelf: 'center',
          top: y,
          width: '90%',
        },
        listContainer: {
          ...shadowStyle.listContainer,
          width: '100%',
          height: MODAL_SIZE,
          backgroundColor: colors.white,
          padding: spacing.s,
          borderRadius: borderRadius.m,
          justifyContent: 'center',
          marginTop: spacing.s,
        },
        dismissButton: { flex: 1, width: '100%' },
        modalChild: { flex: 1 },
      }),
    [y],
  );

export default styles;
