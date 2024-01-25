import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS, SIZES} from '../constants';
import {useSelector} from 'react-redux';

const Divider = () => {
  const appTheme = useSelector(state => state.app.appTheme);

  return (
    <View style={[styles.divider, {backgroundColor: appTheme.lineDivider}]} />
  );
};

export default Divider;

const styles = StyleSheet.create({
  divider: {
    height: 1,
    width: '100%',
  },
});
