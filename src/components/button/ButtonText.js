import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {COLORS, FONTS, SIZES} from '../../constants';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);
const ButtonText = ({label, labelStyle, disabled, style, onPress}) => {
  const scale = useSharedValue(1);
  const scaleAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: scale.value}],
    };
  });
  return (
    <AnimatedTouchableOpacity
      onPressIn={() => {
        scale.value = withTiming(0.95, {duration: 100});
      }}
      onPressOut={() => {
        scale.value = withTiming(1, {duration: 100});
      }}
      activeOpacity={0.8}
      onPress={onPress}
      disabled={disabled}
      style={[styles.btn, style, scaleAnimatedStyle]}>
      <Text style={[styles.text, FONTS.h3, labelStyle]}>{label}</Text>
    </AnimatedTouchableOpacity>
  );
};

export default ButtonText;

const styles = StyleSheet.create({
  btn: {
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    alignSelf: 'flex-start',
    borderRadius: 20,
    padding: SIZES.base,
    paddingHorizontal: SIZES.padding,
  },

  text: {
    color: COLORS.white,
  },
});
