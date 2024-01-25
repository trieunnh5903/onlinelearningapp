import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {COLORS, FONTS, SIZES, icons} from '../constants';
import {MaterialIcons} from './Icon';
import {useSelector} from 'react-redux';

const VerticalCourseCard = ({style, course}) => {
  const appTheme = useSelector(state => state.app.appTheme);
  return (
    <TouchableOpacity activeOpacity={0.8} style={style}>
      <Image source={course.thumbnail} style={styles.image} />
      <View style={styles.info}>
        <View style={styles.play}>
          <Image source={icons.play} resizeMode="contain" style={styles.icon} />
        </View>
        <View style={{flex: 1}}>
          <Text
            numberOfLines={2}
            style={[styles.text, {color: appTheme.textColor}]}>
            {course.title}
          </Text>
          <View style={styles.duration}>
            <MaterialIcons name="alarm" color={COLORS.gray30} size={20} />
            <Text style={styles.subText}>{course.duration}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default VerticalCourseCard;

const styles = StyleSheet.create({
  duration: {flexDirection: 'row', marginHorizontal: SIZES.base},
  info: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
  },
  text: {
    flex: 1,
    ...FONTS.h3,
    fontSize: 18,
    marginHorizontal: SIZES.base,
    color: COLORS.black,
  },

  subText: {
    ...FONTS.body4,
    color: COLORS.gray30,
    marginHorizontal: SIZES.base,
  },

  play: {
    width: 45,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    backgroundColor: COLORS.primary,
  },
  image: {
    height: 150,
    width: SIZES.width * 0.7,
    resizeMode: 'cover',
    borderRadius: SIZES.radius,
    marginBottom: SIZES.radius,
  },
  icon: {width: 20, height: 20},
});
