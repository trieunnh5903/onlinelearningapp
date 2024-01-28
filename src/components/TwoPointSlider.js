import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import {COLORS, FONTS, SIZES} from '../constants';
import {useSelector} from 'react-redux';

const TwoPointSlider = ({values, min, max, prefix, postfix, onValueChange}) => {
  const appTheme = useSelector(state => state.app.appTheme);

  return (
    <MultiSlider
      values={values}
      sliderLength={SIZES.width - 2 * SIZES.padding}
      min={min}
      containerStyle={{marginBottom: 50}}
      max={max}
      step={1}
      markerOffsetY={0}
      selectedStyle={styles.selectedStyle}
      trackStyle={styles.trackStyle}
      onValuesChange={value => onValueChange(value)}
      customMarker={e => {
        return (
          <View style={{width: 'auto'}}>
            <View style={styles.marker} />
            <Text
              style={[
                {
                  color: appTheme.textColor,
                  backgroundColor: appTheme.backgroundColor1,
                },
                styles.markerLabel,
                FONTS.body4,
              ]}>
              {prefix}
              {e.currentValue} {postfix}
            </Text>
          </View>
        );
      }}
    />
  );
};

export default TwoPointSlider;

const styles = StyleSheet.create({
  marker: {
    height: 15,
    width: 15,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: COLORS.primary,
    backgroundColor: COLORS.white,
  },
  trackStyle: {
    height: 1,
    borderRadius: 10,
    backgroundColor: COLORS.gray30,
  },
  selectedStyle: {
    height: 2,
    backgroundColor: COLORS.primary,
  },
  markerLabel: {
    padding: 2,
    width: 60,
    color: COLORS.gray50,
    position: 'absolute',
    bottom: -26,
    left: -14,
  },
});
