import {
  Image,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Animated,
} from 'react-native';
import React, {useRef} from 'react';
import {COLORS, FONTS, SIZES} from '../constants';
import {SharedElement} from 'react-navigation-shared-element';

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);
const CategoryCard = ({
  sharedElementPrefix,
  category,
  onPress,
  containerStyle,
}) => {
  const scaleValue = useRef(new Animated.Value(1)).current;
  const onPressIn = () => {
    Animated.timing(scaleValue, {
      toValue: 0.97,
      useNativeDriver: true,
      duration: 100,
    }).start();
  };

  const onPressOut = () => {
    Animated.timing(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
      duration: 100,
    }).start();
  };
  return (
    <AnimatedTouchableOpacity
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      style={[
        {height: 150, width: SIZES.width * 0.44},
        containerStyle,
        {transform: [{scale: scaleValue}]},
      ]}
      onPress={onPress}
      activeOpacity={0.8}>
      <SharedElement id={`${sharedElementPrefix}-cardImage-${category?.id}`}>
        <Image
          source={category?.thumbnail}
          resizeMode="cover"
          style={styles.image}
        />
      </SharedElement>

      <View style={styles.title}>
        <Text style={{color: COLORS.white, ...FONTS.h2}}>
          {category?.title}
        </Text>
      </View>
    </AnimatedTouchableOpacity>
  );
};

export default CategoryCard;

const styles = StyleSheet.create({
  image: {
    height: '100%',
    width: '100%',
    borderRadius: SIZES.radius,
  },
  title: {
    position: 'absolute',
    bottom: SIZES.radius,
    left: SIZES.radius,
    right: SIZES.radius,
  },
});
