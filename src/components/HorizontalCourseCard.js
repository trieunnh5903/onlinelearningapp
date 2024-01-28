import {Image, ImageBackground, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {COLORS, FONTS, SIZES, icons} from '../constants';
import {MaterialIcons} from './Icon';
import {useSelector} from 'react-redux';

const HorizontalCourseCard = ({containerStyle, course}) => {
  const appTheme = useSelector(state => state.app.appTheme);
  const tintColor = course?.is_favourite
    ? COLORS.secondary
    : COLORS.additionalColor4;
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={{flexDirection: 'row', ...containerStyle}}>
      <ImageBackground
        source={course.thumbnail}
        resizeMode="cover"
        style={{width: 130, aspectRatio: 1}}
        imageStyle={{borderRadius: SIZES.radius}}>
        <View style={styles.favoriteWrapper}>
          <Image
            source={icons.favourite}
            resizeMode="contain"
            style={{
              width: 20,
              height: 20,
              tintColor,
            }}
          />
        </View>
      </ImageBackground>

      <View style={{flex: 1, marginLeft: SIZES.base}}>
        <Text style={[styles.title, {color: appTheme.textColor}]}>
          {course.title}
        </Text>

        <View style={styles.author}>
          <Text style={{color: COLORS.gray30, ...FONTS.body4}}>
            By {course.instructor}
          </Text>
          <View style={styles.duration}>
            <MaterialIcons name="alarm" color={COLORS.gray30} size={20} />
            <Text style={styles.subText}>{course.duration}</Text>
          </View>
        </View>

        <View style={styles.price}>
          <Text style={[FONTS.h2, {color: COLORS.primary}]}>
            ${course.price.toFixed(2)}
          </Text>

          <View style={styles.ratingWrapper}>
            <Image source={icons.star} style={styles.icon} />
            <Text style={[styles.subText, {color: appTheme.textColor}]}>
              {course.ratings}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default HorizontalCourseCard;

const styles = StyleSheet.create({
  author: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SIZES.base,
  },

  duration: {
    flexDirection: 'row',
    gap: 4,
    marginHorizontal: SIZES.base,
  },
  title: {
    ...FONTS.h3,
    fontSize: 18,
    color: COLORS.black,
  },
  price: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SIZES.base,
  },
  ratingWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: SIZES.base,
    gap: 4,
  },

  subText: {
    ...FONTS.body4,
    color: COLORS.gray30,
  },

  icon: {
    width: 18,
    height: 18,
  },

  favoriteWrapper: {
    position: 'absolute',
    top: 10,
    width: 30,
    right: 10,
    aspectRatio: 1,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: SIZES.radius,
  },
});
