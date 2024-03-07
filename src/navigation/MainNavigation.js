import {Easing, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import BottomTabs from './BottomTabs';
import {CourseDetailScreen, CourseListingScreen} from '../screens';

const Stack = createSharedElementStackNavigator();
const MainNavigation = () => {
  return (
    <Stack.Navigator
      // detachInactiveScreens={false}
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="BottomTabs" component={BottomTabs} />
      <Stack.Screen name="CourseDetail" component={CourseDetailScreen} />
      <Stack.Screen
        name="CourseListing"
        component={CourseListingScreen}
        sharedElements={(route, otherRoute, showing) => {
          // if (
          //   otherRoute.name === 'SearchScreen' ||
          //   otherRoute.name === 'BottomTabs' ||
          //   otherRoute.name === 'HomeScreen'
          // ) {
          //   const {category, sharedElementPrefix} = route.params;
          //   return [`${sharedElementPrefix}-cardImage-${category?.id}`];
          // }
          const {category, sharedElementPrefix} = route.params;
          return [`${sharedElementPrefix}-cardImage-${category?.id}`];
        }}
        options={{
          gestureEnabled: false,
          transitionSpec: {
            open: {
              animtion: 'timing',
              config: {duration: 400, easing: Easing.inOut(Easing.ease)},
            },
            close: {
              animtion: 'timing',
              config: {duration: 400, easing: Easing.inOut(Easing.ease)},
            },
          },
          cardStyleInterpolator: ({current: {progress}}) => {
            return {
              cardStyle: {
                opacity: progress,
              },
            };
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default MainNavigation;

const styles = StyleSheet.create({});
