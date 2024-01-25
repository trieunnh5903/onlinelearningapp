import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {COLORS, FONTS, SIZES, icons} from '../constants';
import {useSelector} from 'react-redux';

const ProfileValue = ({icon, label, value, onPress}) => {
  const appTheme = useSelector(state => state.app.appTheme);
  return (
    <TouchableOpacity style={styles.btn} onPress={onPress}>
      <View
        style={[
          {
            backgroundColor: appTheme.backgroundColor3,
          },
          styles.container,
        ]}>
        <Image source={icon} resizeMode="contain" style={styles.icon} />
      </View>
      {/* label & value */}
      <View style={styles.label}>
        {label && (
          <Text style={{color: appTheme.textColor3, ...FONTS.body3}}>
            {label}
          </Text>
        )}

        <Text style={[FONTS.h3, {color: appTheme.textColor}]}>{value}</Text>
      </View>

      <Image
        source={icons.right_arrow}
        style={styles.rightIcon}
        tintColor={appTheme?.tintColor}
      />
    </TouchableOpacity>
  );
};

export default ProfileValue;

const styles = StyleSheet.create({
  rightIcon: {width: 15, height: 15},
  label: {flex: 1, marginLeft: SIZES.radius},
  icon: {width: 25, height: 25, tintColor: COLORS.primary},
  container: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  btn: {flexDirection: 'row', height: 80, alignItems: 'center'},
});
