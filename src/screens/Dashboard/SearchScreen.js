import React, {useRef} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {SIZES, FONTS, dummyData, COLORS, icons} from '../../constants';
import {FlatList, TextInput} from 'react-native-gesture-handler';
import {ButtonText, CategoryCard} from '../../components';
import {Image} from 'react-native-animatable';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

const SearchScreen = ({navigation}) => {
  const appTheme = useSelector(s => s.app.appTheme);
  const scrollViewRef = useRef(null);
  const scrollY = useSharedValue(0);
  // const offset = useRef(0);
  // const oldCondition = useRef(null);
  // const hideTabBar = () => {
  //   navigation.setOptions({
  //     tabBarStyle: {display: 'none'},
  //   });
  // };
  // const showTabBar = () => {
  //   navigation.setOptions({
  //     tabBarStyle: {display: 'flex'},
  //   });
  // };

  const onScroll = useAnimatedScrollHandler(e => {
    scrollY.value = e.contentOffset.y;
  });
  const searchBarAnimatedStyle = useAnimatedStyle(() => {
    const height = interpolate(
      scrollY.value,
      [0, 50],
      [50, 0],
      Extrapolation.CLAMP,
    );
    const opacity = interpolate(
      scrollY.value,
      [0, 50],
      [1, 0],
      Extrapolation.CLAMP,
    );
    return {
      height,
      opacity,
    };
  });
  return (
    <Animated.ScrollView
      ref={scrollViewRef}
      onScroll={onScroll}
      contentContainerStyle={[
        styles.container,
        {backgroundColor: appTheme.backgroundColor1},
      ]}
      showsVerticalScrollIndicator={false}
      onScrollEndDrag={event => {
        if (
          event.nativeEvent.contentOffset.y > 10 &&
          event.nativeEvent.contentOffset.y < 50
        ) {
          scrollViewRef.current?.scrollTo({
            x: 0,
            y: 60,
            animated: true,
          });
        }
      }}
      keyboardDismissMode={'on-drag'}>
      {/* top searches */}
      <TopSearches />
      <BrowerCategories />
      <Animated.View style={[styles.searchBar, searchBarAnimatedStyle]}>
        <View style={styles.searchBarContainer}>
          <Image source={icons.search} style={styles.searchIcon} />

          <TextInput
            style={styles.searchInput}
            placeholder="Search for Topics, Courses and Educators"
            placeholderTextColor={COLORS.gray20}
          />
        </View>
      </Animated.View>
    </Animated.ScrollView>
  );
};

const TopSearches = () => {
  const appTheme = useSelector(s => s.app.appTheme);

  return (
    <View style={{marginTop: SIZES.padding}}>
      <Text
        style={{
          marginHorizontal: SIZES.padding,
          ...FONTS.h2,
          color: appTheme.textColor,
        }}>
        Top Searches
      </Text>
      <FlatList
        horizontal
        data={dummyData.top_searches}
        keyExtractor={item => 'top search' + item.id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          marginTop: SIZES.radius,
        }}
        renderItem={({item, index}) => {
          return (
            <ButtonText
              label={item.label}
              style={[
                {
                  marginLeft: index == 0 ? SIZES.padding : SIZES.radius,
                  marginRight:
                    index === dummyData.top_searches.length - 1
                      ? SIZES.padding
                      : 0,
                },
                styles.topSearchItem,
              ]}
              labelStyle={{
                color: COLORS.gray50,
                ...FONTS.h3,
              }}
            />
          );
        }}
      />
    </View>
  );
};

const BrowerCategories = () => {
  const appTheme = useSelector(s => s.app.appTheme);
  const navigation = useNavigation();
  return (
    <View style={{marginTop: SIZES.padding}}>
      <Text
        style={{
          marginHorizontal: SIZES.padding,
          ...FONTS.h2,
          color: appTheme.textColor,
        }}>
        Browse Categories
      </Text>

      <FlatList
        data={dummyData.categories}
        numColumns={2}
        scrollEnabled={false}
        keyExtractor={i => 'browser category' + i.id}
        contentContainerStyle={{
          marginTop: SIZES.radius,
        }}
        renderItem={({item, index}) => (
          <CategoryCard
            sharedElementPrefix={'Search'}
            onPress={() =>
              navigation.navigate('CourseListing', {
                category: item,
                sharedElementPrefix: 'Search',
              })
            }
            category={item}
            containerStyle={{
              width: (SIZES.width - SIZES.padding * 2 - SIZES.radius) / 2,
              marginTop: SIZES.radius,
              marginLeft: (index + 1) / 2 === 0 ? SIZES.radius : SIZES.padding,
            }}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  topSearchItem: {
    paddingVertical: SIZES.radius,
    paddingHorizontal: SIZES.padding,
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.gray10,
  },
  searchInput: {flex: 1, marginLeft: SIZES.base, ...FONTS.h4},
  searchIcon: {width: 25, height: 25, tintColor: COLORS.gray40},
  searchBarContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    width: SIZES.width - SIZES.padding * 2,
    paddingHorizontal: SIZES.radius,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    borderWidth: 1,
    borderColor: COLORS.gray20,
  },
  searchBar: {
    position: 'absolute',
    top: SIZES.padding,
    left: 0,
    right: 0,
    paddingHorizontal: SIZES.padding,
  },
  container: {
    paddingTop: 50 + 16,
    paddingBottom: 100,
  },
});

export default SearchScreen;
