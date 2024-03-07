import {BackHandler, Image, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {SharedElement} from 'react-navigation-shared-element';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {
  COLORS,
  FONTS,
  SIZES,
  constants,
  dummyData,
  icons,
  images,
} from '../../constants';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import {
  ButtonIcon,
  ButtonText,
  Divider,
  HorizontalCourseCard,
  TwoPointSlider,
} from '../../components';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetScrollView,
  TouchableOpacity,
} from '@gorhom/bottom-sheet';
import {SafeAreaView} from 'react-native-safe-area-context';

const HEADER_HEIGHT_MAX_HEIGHT = 250;
const HEADER_HEIGHT_MIN_HEIGHT = 80;

const CourseListingScreen = () => {
  const appTheme = useSelector(state => state.app.appTheme);
  const scrollY = useSharedValue(0);

  const bottomSheetRef = useRef(null);

  const handleFilterPress = () => bottomSheetRef.current.expand();

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: appTheme.backgroundColor1}]}>
      <CourseList scrollY={scrollY} onFilterPress={handleFilterPress} />
      <CustomHeader scrollY={scrollY} />
      <CustomBottomSheet bottomSheetRef={bottomSheetRef} />
    </SafeAreaView>
  );
};

const CustomBottomSheet = ({bottomSheetRef}) => {
  const snapPoints = useMemo(() => ['90%'], []);
  const handleCloseFilterPress = () => bottomSheetRef.current.close();
  const [selectedClassType, setSelectedClassType] = useState('');
  const [selectedClassLevel, setSelectedClassLevel] = useState('');
  const [selectedCreatedWithin, setSelectedCreatedWithin] = useState('');
  const renderBackdrop = useCallback(
    props => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} />,
    [],
  );
  const appTheme = useSelector(state => state.app.appTheme);
  return (
    <BottomSheet
      ref={bottomSheetRef}
      style={{flex: 1}}
      index={-1}
      snapPoints={snapPoints}
      handleComponent={null}
      backdropComponent={renderBackdrop}>
      <BottomSheetScrollView
        showsVerticalScrollIndicator={false}
        style={{
          backgroundColor: appTheme.backgroundColor1,
        }}
        contentContainerStyle={{
          paddingHorizontal: SIZES.padding,
        }}>
        {/* header */}
        <View
          style={{
            flex: 1,
          }}>
          <View style={styles.BottomSheetHeader}>
            <ButtonText
              disabled={true}
              label={'Cancel'}
              labelStyle={[{color: 'transparent'}]}
              style={{backgroundColor: undefined}}
            />
            <Text
              style={[
                {color: appTheme.textColor, flex: 1, textAlign: 'center'},
                FONTS.h1,
              ]}>
              Filter
            </Text>
            <ButtonText
              onPress={handleCloseFilterPress}
              label={'Cancel'}
              labelStyle={[{color: appTheme.textColor}, FONTS.body3]}
              style={{backgroundColor: undefined, paddingRight: 0}}
            />
          </View>
        </View>

        {/* class type */}
        <Text style={[{color: appTheme.textColor}, FONTS.h3]}>Class Type</Text>
        <View style={styles.classType}>
          {constants.class_types.map((item, index) => {
            return (
              <ClassTypeOption
                key={'Class type' + item.id}
                classType={item}
                isSelected={selectedClassType === item.id}
                onPress={() => setSelectedClassType(item.id)}
                containerStyle={{
                  width:
                    (SIZES.width - 2 * SIZES.padding - 2 * SIZES.radius) / 3,
                }}
              />
            );
          })}
        </View>

        {/* class level */}
        <Text
          style={[
            {color: appTheme.textColor, marginTop: SIZES.radius},
            FONTS.h3,
          ]}>
          Class Level
        </Text>
        <View>
          {constants.class_levels.map((item, index) => {
            return (
              <ClassLevelOption
                classLevel={item}
                key={'class level' + item.id}
                isSelected={selectedClassLevel === item?.id}
                isLastedItem={index === constants.class_levels.length - 1}
                onPress={() => setSelectedClassLevel(item.id)}
              />
            );
          })}
        </View>

        {/* created within */}
        <View style={{marginTop: SIZES.radius}}>
          <Text style={[FONTS.h3, {color: appTheme.textColor}]}>
            Created Within
          </Text>
          <View style={styles.createdWithinContainer}>
            {constants.created_within.map((item, index) => {
              const marginLeft = index % 3 === 0 ? 0 : SIZES.radius;
              const backgroundColor =
                item.id === selectedCreatedWithin ? COLORS.primary : undefined;
              const color =
                item.id === selectedCreatedWithin
                  ? COLORS.white
                  : appTheme.textColor;
              return (
                <ButtonText
                  key={'created within' + item.id}
                  label={item.label}
                  style={[
                    {
                      marginLeft,
                      backgroundColor,
                    },
                    styles.createdWithin,
                  ]}
                  labelStyle={[{color}, FONTS.body3]}
                  onPress={() => {
                    setSelectedCreatedWithin(item.id);
                  }}
                />
              );
            })}
          </View>
        </View>

        {/* class length */}
        <View style={{marginTop: SIZES.radius}}>
          <Text style={[FONTS.h3, {color: appTheme.textColor}]}>
            Class length
          </Text>
          <TwoPointSlider
            values={[20, 25]}
            min={15}
            max={60}
            postfix={'min'}
            onValueChange={values => {}}
          />
        </View>
      </BottomSheetScrollView>
    </BottomSheet>
  );
};

const ClassLevelOption = ({
  containerStyle,
  classLevel,
  isSelected,
  isLastedItem,
  onPress,
}) => {
  const appTheme = useSelector(state => state.app.appTheme);

  return (
    <>
      <TouchableOpacity
        activeOpacity={1}
        style={[styles.classLevelContainer, containerStyle]}
        onPress={onPress}>
        <Text style={{flex: 1, color: appTheme.textColor, ...FONTS.body3}}>
          {classLevel.label}
        </Text>
        <Image
          source={isSelected ? icons.checkbox_on : icons.checkbox_off}
          resizeMode="contain"
          style={{width: 20, height: 20}}
        />
      </TouchableOpacity>
      {!isLastedItem && <Divider />}
    </>
  );
};

const ClassTypeOption = ({containerStyle, classType, isSelected, onPress}) => {
  const backgroundColor = isSelected ? COLORS.primary : COLORS.additionalColor9;
  const tintColor = isSelected ? COLORS.white : COLORS.gray85;
  const color = isSelected ? COLORS.white : COLORS.gray80;
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[{backgroundColor}, styles.classTypeContainer, containerStyle]}>
      <Image
        source={classType.icon}
        resizeMode="contain"
        style={[{tintColor}, styles.classTypeIcon]}
      />

      <Text
        style={[
          {
            marginTop: SIZES.base,
            color,
          },
          FONTS.h3,
        ]}>
        {classType.label}
      </Text>
    </TouchableOpacity>
  );
};

const CourseList = ({scrollY, onFilterPress}) => {
  const flatlistRef = useRef(null);
  const onScroll = useAnimatedScrollHandler(e => {
    scrollY.value = e.contentOffset.y;
  });
  const appTheme = useSelector(state => state.app.appTheme);
  const navigation = useNavigation();
  return (
    <Animated.FlatList
      onScroll={onScroll}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingHorizontal: SIZES.padding,
        paddingTop: HEADER_HEIGHT_MAX_HEIGHT,
      }}
      showsHorizontalScrollIndicator={false}
      scrollEventThrottle={16}
      keyboardDismissMode={'on-drag'}
      ref={flatlistRef}
      data={dummyData.courses_list_2}
      keyExtractor={item => item.id + 'courselist'}
      ItemSeparatorComponent={<Divider />}
      renderItem={({item, index}) => {
        const marginTop = index === 0 ? SIZES.radius : SIZES.padding;
        return (
          <HorizontalCourseCard
            course={item}
            containerStyle={{
              marginVertical: SIZES.padding,
              marginTop,
            }}
            onPress={() =>
              navigation.navigate('CourseDetail', {selectedCourse: item})
            }
          />
        );
      }}
      ListHeaderComponent={
        <View style={styles.courseListWrapper}>
          <Text style={[{flex: 1, color: appTheme.textColor}, FONTS.body3]}>
            5,761 Results
          </Text>
          <ButtonIcon
            onPress={onFilterPress}
            source={icons.filter}
            iconStyle={{width: 20, height: 20}}
            style={styles.filterIconContainer}
          />
        </View>
      }
    />
  );
};

const CustomHeader = ({scrollY}) => {
  const route = useRoute();
  const navigation = useNavigation();
  const appTheme = useSelector(state => state.app.appTheme);
  const {category, sharedElementPrefix} = route.params;
  const opacityMobileValue = useSharedValue(0);

  const handleBack = useCallback(() => {
    opacityMobileValue.value = withTiming(0, undefined, () => {});
    navigation.goBack();
  }, [navigation, opacityMobileValue]);

  useEffect(() => {
    opacityMobileValue.value = withDelay(500, withTiming(1, {duration: 500}));
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        opacityMobileValue.value = withTiming(0, undefined, () => {});
        navigation.goBack();
        return true;
      },
    );
    return () => backHandler.remove();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const imageStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      opacityMobileValue.value,
      [0, 1],
      [HEADER_HEIGHT_MIN_HEIGHT, 0],
      Extrapolation.CLAMP,
    );
    return {
      opacity: opacityMobileValue.value,
      transform: [{translateY: translateY}],
    };
  });

  const title1AnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        scrollY.value,
        [HEADER_HEIGHT_MIN_HEIGHT, 0],
        [0, 1],
        Extrapolation.CLAMP,
      ),
      transform: [{translateY: scrollY.value}],
    };
  });

  const title2AnimatedStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      scrollY.value,
      [HEADER_HEIGHT_MAX_HEIGHT, HEADER_HEIGHT_MIN_HEIGHT],
      [0, -200],
      Extrapolation.CLAMP,
    );
    return {
      transform: [{translateY}],
      opacity: interpolate(
        scrollY.value,
        [HEADER_HEIGHT_MIN_HEIGHT, 0],
        [1, 0],
        Extrapolation.CLAMP,
      ),
    };
  });

  const headerHeightStyle = useAnimatedStyle(() => {
    return {
      height: interpolate(
        scrollY.value,
        [0, HEADER_HEIGHT_MAX_HEIGHT - 50],
        [HEADER_HEIGHT_MAX_HEIGHT, HEADER_HEIGHT_MIN_HEIGHT],
        Extrapolation.CLAMP,
      ),
    };
  });

  return (
    <Animated.View style={[styles.header, headerHeightStyle]}>
      {/* bg */}
      <SharedElement id={`${sharedElementPrefix}-cardImage-${category?.id}`}>
        <Image
          source={category?.thumbnail}
          resizeMode="cover"
          style={styles.bgCategory}
        />
      </SharedElement>

      {/* title 1 */}
      <Animated.View
        style={[styles.title1Wrapper, imageStyle, title1AnimatedStyle]}>
        <Text style={{color: COLORS.white, ...FONTS.h2}}>
          {category?.title}
        </Text>
      </Animated.View>

      {/* title 2 */}
      <Animated.View style={[styles.title2Wrapper, title2AnimatedStyle]}>
        <Text style={[FONTS.h2, styles.title2]}>{category?.title}</Text>
      </Animated.View>

      {/* back */}
      <View style={[{backgroundColor: appTheme.backgroundColor1}, styles.back]}>
        <ButtonIcon
          onPress={handleBack}
          source={icons.back}
          iconColor={appTheme.textColor}
          iconStyle={styles.backIcon}
        />
      </View>

      {/* image mobile */}
      <Animated.Image
        source={images.mobile_image}
        resizeMode="cover"
        style={[styles.headerMobile, imageStyle, title1AnimatedStyle]}
      />
    </Animated.View>
  );
};

export default CourseListingScreen;

const styles = StyleSheet.create({
  BottomSheetHeader: {flexDirection: 'row', flex: 1, padding: SIZES.padding},
  createdWithinContainer: {flex: 1, flexDirection: 'row', flexWrap: 'wrap'},
  classTypeIcon: {width: 40, height: 40},
  createdWithin: {
    height: 45,
    paddingHorizontal: SIZES.radius,
    marginTop: SIZES.radius,
    borderWidth: 1,
    borderRadius: SIZES.radius,
    borderColor: COLORS.gray20,
  },
  backIcon: {width: 24, height: 24, margin: 6},
  title2: {color: COLORS.white, textAlign: 'center'},
  bgCategory: {width: '100%', height: '100%', borderBottomLeftRadius: 60},
  classType: {
    marginTop: SIZES.radius,
    gap: SIZES.radius,
    flexDirection: 'row',
  },
  back: {
    position: 'absolute',
    top: 0,
    borderRadius: 100,
    margin: 16,
  },

  classTypeContainer: {
    padding: SIZES.padding,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SIZES.radius,
    borderRadius: SIZES.radius,
  },
  classLevelContainer: {
    flexDirection: 'row',
    height: 54,
    alignItems: 'center',
  },
  container: {flex: 1},
  headerMobile: {
    position: 'absolute',
    bottom: -40,
    right: 20,
    width: 100,
    height: 200,
  },
  filterIconContainer: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: COLORS.primary,
  },
  header: {
    width: '100%',
    height: HEADER_HEIGHT_MAX_HEIGHT,
    overflow: 'hidden',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },

  title2Wrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: HEADER_HEIGHT_MIN_HEIGHT,
    justifyContent: 'center',
  },

  courseListWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: SIZES.padding,
  },

  title1Wrapper: {
    position: 'absolute',
    bottom: SIZES.padding,
    left: 50,
  },
});
