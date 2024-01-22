import {Image, Pressable, StyleSheet, Text} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {HomeScreen, ProfileScreen, SearchScreen} from '../screens';
import {COLORS, SIZES, icons} from '../constants';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
const Tab = createBottomTabNavigator();

function MyTabBar({state, descriptors, navigation}) {
  const opacity = useSharedValue(1);
  const TAB_WIDTH = (SIZES.width - 32) / 3;
  const offset = useSharedValue(0);
  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{translateX: offset.value}],
  }));
  const focusedOptions = descriptors[state.routes[state.index].key].options;
  if (focusedOptions?.tabBarStyle?.display === 'none') {
    opacity.value = withTiming(0);
  } else {
    opacity.value = withTiming(1);
  }

  const tabBarAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  return (
    <Animated.View style={[styles.tabBar, tabBarAnimatedStyle]}>
      <Animated.View
        style={[{width: TAB_WIDTH}, styles.greenBox, animatedStyles]}
      />

      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            if (route.name === 'Home') {
              offset.value = withTiming(0);
            } else if (route.name === 'Search') {
              offset.value = withTiming(TAB_WIDTH);
            } else {
              offset.value = withTiming(2 * TAB_WIDTH);
            }
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        let iconName;
        if (route.name === 'Home') {
          iconName = icons.home;
        } else if (route.name === 'Search') {
          iconName = icons.search;
        } else {
          iconName = icons.profile;
        }

        return (
          <Pressable
            key={'tab' + label}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.buttonTab}>
            <Image
              source={iconName}
              tintColor={COLORS.white}
              style={{width: 24, height: 24}}
            />
            <Text style={{color: COLORS.white}}>{label}</Text>
          </Pressable>
        );
      })}
    </Animated.View>
  );
}

const BottomTabs = () => {
  return (
    <Tab.Navigator
      tabBar={props => <MyTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen
        component={HomeScreen}
        name="Home"
        initialParams={{showTabBar: true}}
      />
      <Tab.Screen component={SearchScreen} name="Search" />
      <Tab.Screen component={ProfileScreen} name="Profile" />
    </Tab.Navigator>
  );
};

export default BottomTabs;

const styles = StyleSheet.create({
  greenBox: {
    height: '100%',
    position: 'absolute',
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.radius,
  },

  tabBar: {
    flexDirection: 'row',
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 16,
    height: 70,
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.primary3,
  },

  buttonTab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    borderRadius: SIZES.radius,
  },
});