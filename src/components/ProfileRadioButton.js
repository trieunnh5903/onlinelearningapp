import {Animated, Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {COLORS, FONTS, SIZES} from '../constants';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';

const ProfileRadioButton = ({icon, label, isSelected, onPress}) => {
  const radioValue = useRef(new Animated.Value(0)).current;
  const appTheme = useSelector(state => state.app.appTheme);

  const lineColorAnimatedStyle = radioValue.interpolate({
    inputRange: [0, 17],
    outputRange: [COLORS.additionalColor4, COLORS.primary],
  });

  const circleColorAnimatedStyle = radioValue.interpolate({
    inputRange: [0, 17],
    outputRange: [COLORS.additionalColor4, COLORS.primary],
  });

  useEffect(() => {
    if (isSelected) {
      Animated.timing(radioValue, {
        toValue: 17,
        useNativeDriver: false,
        duration: 300,
      }).start();
    } else {
      Animated.timing(radioValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSelected]);

  return (
    <View style={styles.container}>
      <View
        style={
          ({
            backgroundColor: appTheme.backgroundColor3,
          },
          styles.iconContainer)
        }>
        <Image source={icon} resizeMode="contain" style={styles.icon} />
      </View>
      {/* label */}
      <View style={styles.label}>
        <Text style={{...FONTS.h3, color: appTheme.textColor}}>{label}</Text>
      </View>

      {/* radio button */}
      <TouchableOpacity activeOpacity={1} style={styles.btn} onPress={onPress}>
        <Animated.View
          style={[
            {
              backgroundColor: lineColorAnimatedStyle,
            },
            styles.line,
          ]}
        />

        <Animated.View
          style={[
            {
              left: radioValue,
              borderColor: circleColorAnimatedStyle,
            },
            styles.circle,
          ]}
        />
      </TouchableOpacity>
    </View>
  );
};

export default ProfileRadioButton;

const styles = StyleSheet.create({
  iconContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: SIZES.radius,
  },
  label: {flex: 1, marginLeft: SIZES.radius},
  icon: {
    width: 25,
    height: 25,
    tintColor: COLORS.primary,
  },
  btn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  line: {
    width: '100%',
    height: 5,
    borderRadius: 3,
  },
  container: {
    flexDirection: 'row',
    height: 80,
    alignItems: 'center',
  },

  circle: {
    position: 'absolute',
    width: 25,
    height: 25,
    borderRadius: 15,
    borderWidth: 5,
    backgroundColor: COLORS.primary3,
  },
});
