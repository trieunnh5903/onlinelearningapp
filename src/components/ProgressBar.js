import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS} from '../constants';

const ProgressBar = ({containerStyle, progress}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <View
        style={[
          styles.progress,
          {
            width: progress,
          },
        ]}
      />
    </View>
  );
};

export default ProgressBar;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 13,
    borderRadius: 10,
    backgroundColor: COLORS.white,
  },

  progress: {
    position: 'absolute',
    left: 0,
    height: '100%',
    borderRadius: 10,
    backgroundColor: COLORS.primary,
  },
});
