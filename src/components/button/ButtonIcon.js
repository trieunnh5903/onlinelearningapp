import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

const ButtonIcon = ({source, iconStyle, iconColor, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Image
        source={source}
        style={[styles.icon, iconStyle]}
        tintColor={iconColor}
      />
    </TouchableOpacity>
  );
};

export default ButtonIcon;

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },
});
