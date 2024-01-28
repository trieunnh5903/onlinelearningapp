import React, {useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  Pressable,
} from 'react-native';
import globalStyle from '../../styles/global.style';
import {SafeAreaView} from 'react-native-safe-area-context';
import {COLORS, FONTS, SIZES, dummyData, images} from '../../constants';
import {
  ButtonText,
  CategoryCard,
  Divider,
  HorizontalCourseCard,
  VerticalCourseCard,
} from '../../components';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {FlatList} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
const HomeScreen = ({navigation}) => {
  const appTheme = useSelector(state => state.app.appTheme);
  const offset = useRef(0);
  const oldCondition = useRef(null);
  const hideTabBar = () => {
    navigation.setOptions({
      tabBarStyle: {display: 'none'},
    });
  };
  const showTabBar = () => {
    navigation.setOptions({
      tabBarStyle: {display: 'flex'},
    });
  };

  const onScroll = e => {
    const currentOffset = e.nativeEvent.contentOffset.y;
    const dif = currentOffset - (offset.current || 0);
    offset.current = currentOffset;
    const condition = currentOffset < 100 || dif < 0;

    if (oldCondition.current !== condition) {
      if (condition) {
        showTabBar();
      } else {
        hideTabBar();
      }
    }
    oldCondition.current = condition;
  };
  return (
    <SafeAreaView
      style={[
        globalStyle.container,
        {backgroundColor: appTheme.backgroundColor1},
      ]}>
      <FlatList
        overScrollMode="never"
        onScroll={onScroll}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View style={{flex: 1, gap: SIZES.padding}}>
            <MyHeader />
            <StartLearning />
            <Courses />
            <View style={{height: 10}} />

            <Divider />
            <View style={{height: 10}} />
            <Category />
            <Section
              containerStyle={{marginTop: 30}}
              title={'Popular Courses'}
            />
          </View>
        }
        data={dummyData.courses_list_2}
        key={item => `popular couses ${item.id}`}
        renderItem={({item, index}) => {
          return (
            <HorizontalCourseCard
              course={item}
              containerStyle={{
                paddingHorizontal: SIZES.padding,
                marginVertical: SIZES.padding,
                marginTop: index === 0 ? SIZES.radius : SIZES.padding,
              }}
            />
          );
        }}
      />
    </SafeAreaView>
  );
};

const Category = () => {
  const naigation = useNavigation();
  return (
    <Section title={'Categories'}>
      <FlatList
        overScrollMode="never"
        horizontal
        data={dummyData.categories}
        keyExtractor={item => item.id + 'categories'}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          marginTop: SIZES.radius,
        }}
        renderItem={({item, index}) => {
          return (
            <CategoryCard
              sharedElementPrefix={'Home'}
              onPress={() =>
                naigation.navigate('CourseListing', {
                  category: item,
                  sharedElementPrefix: 'Home',
                })
              }
              category={item}
              containerStyle={{
                marginLeft: index === 0 ? SIZES.padding : SIZES.base,
                marginRight:
                  index === dummyData.categories.length - 1 ? SIZES.padding : 0,
              }}
            />
          );
        }}
      />
    </Section>
  );
};

const Section = ({containerStyle, title, onPress, children}) => {
  const appTheme = useSelector(state => state.app.appTheme);

  return (
    <View style={{...containerStyle}}>
      <View style={styles.section}>
        <Text style={{flex: 1, ...FONTS.h2, color: appTheme.textColor}}>
          {title}
        </Text>
        <ButtonText style={styles.seeAll} label={'See All'} onPress={onPress} />
      </View>
      {children}
    </View>
  );
};

const StartLearning = () => {
  return (
    <ImageBackground
      imageStyle={{borderRadius: SIZES.radius}}
      source={images.featured_bg_image}
      style={styles.featured_bg_image}>
      {/* text */}
      <View>
        <Text style={{color: COLORS.white, ...FONTS.body2}}>HOW TO</Text>
        <Text style={{color: COLORS.white, ...FONTS.h2}}>
          Make your brand more visible with our checklist
        </Text>
        <Text
          style={{
            color: COLORS.white,
            ...FONTS.body4,
            marginTop: SIZES.radius,
          }}>
          By Scott Harris
        </Text>
      </View>
      {/* image */}
      <Image source={images.start_learning} style={styles.startLearningImage} />
      {/* button */}
      <ButtonText
        label={'Start Learning'}
        style={styles.startLearningButton}
        labelStyle={{color: COLORS.black}}
      />
    </ImageBackground>
  );
};
const MyHeader = () => {
  const appTheme = useSelector(state => state.app.appTheme);

  return (
    <View style={styles.header}>
      <View>
        <Text style={[FONTS.h2, {color: appTheme.textColor}]}>
          Hello, User!
        </Text>
        <Text style={[FONTS.body4, {color: appTheme.textColor3}]}>
          Thursday, 9th Sep 2021
        </Text>
      </View>
      <Pressable>
        <Ionicons
          name="notifications-outline"
          color={appTheme.textColor}
          size={30}
        />
      </Pressable>
    </View>
  );
};

const Courses = () => {
  return (
    <FlatList
      snapToInterval={SIZES.width * 0.7}
      overScrollMode="never"
      decelerationRate={'fast'}
      horizontal
      keyExtractor={item => `course-${item.id}`}
      showsHorizontalScrollIndicator={false}
      data={dummyData.courses_list_1}
      pagingEnabled
      renderItem={({item, index}) => {
        return (
          <VerticalCourseCard
            course={item}
            style={{
              width: SIZES.width * 0.7,
              marginLeft: SIZES.radius,
              marginRight:
                index === dummyData.courses_list_1.length - 1
                  ? SIZES.radius
                  : 0,
            }}
          />
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  section: {
    flexDirection: 'row',
    paddingHorizontal: SIZES.padding,
    alignItems: 'center',
  },
  seeAll: {
    backgroundColor: COLORS.primary,
    borderRadius: 30,
    paddingHorizontal: 20,
  },
  startLearningButton: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: SIZES.base,
    paddingHorizontal: SIZES.padding,
  },
  startLearningImage: {
    width: '100%',
    height: 110,
    marginTop: SIZES.padding,
  },

  featured_bg_image: {
    padding: SIZES.padding,
    marginHorizontal: SIZES.padding,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: SIZES.padding,
    marginBottom: 0,
  },
});

export default HomeScreen;
