import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {COLORS, FONTS, SIZES} from '../constants';

const CategoryCard = ({category, containerStyle}) => {
  return (
    <TouchableOpacity activeOpacity={0.8}>
      <ImageBackground
        source={category?.thumbnail}
        resizeMode="cover"
        style={[styles.card, containerStyle]}>
        <Text style={{color: COLORS.white, ...FONTS.h2}}>
          {category?.title}
        </Text>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default CategoryCard;

const styles = StyleSheet.create({
  card: {
    height: 150,
    width: SIZES.width * 0.44,
    paddingHorizontal: SIZES.radius,
    paddingVertical: SIZES.padding,
    justifyContent: 'flex-end',
    borderRadius: SIZES.radius,
  },
});
