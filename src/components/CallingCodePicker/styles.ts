import { useMemo } from 'react';
import { Platform, StyleSheet } from 'react-native';
import { borderRadii, borderRadius, colors, MODAL_SIZE, spacing } from '../../theme';

const styles = (y: number) =>
  useMemo(
    () =>
      StyleSheet.create({
        listContainer: {
          ...shadowStyle.listContainer,
          width: '100%',
          height: MODAL_SIZE,
          backgroundColor: colors.white,
          padding: spacing.m,
          borderRadius: borderRadius.m,
          justifyContent: 'center',
          marginTop: spacing.s,
        },
        activityIndicatorContainer: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        },
        keyboardAvoidingView: {
          position: 'absolute',
          alignSelf: 'center',
          top: y,
          width: '90%',
        },
        dismissButton: { flex: 1, width: '100%' },
        modalChild: { flex: 1, width: '100%', justifyContent: 'center' },
      }),
    [y],
  );

export default styles;
