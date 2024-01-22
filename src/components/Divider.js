import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS, SIZES} from '../constants';

const Divider = () => {
  return <View style={styles.divider} />;
};

export default Divider;

const styles = StyleSheet.create({
  divider: {
    height: 1,
    width: SIZES.width,
    backgroundColor: COLORS.gray10,
  },
});
