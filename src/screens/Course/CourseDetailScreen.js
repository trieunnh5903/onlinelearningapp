import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {COLORS, SIZES, dummyData, icons} from '../../constants';
import {useNavigation, useRoute} from '@react-navigation/native';
import {ButtonIcon} from '../../components';
import Video from 'react-native-video';

const CourseDetailScreen = () => {
  const appTheme = useSelector(state => state.app.appTheme);
  return (
    <View style={{flex: 1, backgroundColor: appTheme.backgroundColor1}}>
      <CustomHeader />
      <VideoSection />
    </View>
  );
};

const CustomHeader = () => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        flexDirection: 'row',
        paddingHorizontal: SIZES.padding,
        zIndex: 1,
      }}>
      <View style={{flex: 1}}>
        <ButtonIcon
          source={icons.back}
          iconStyle={{
            width: 25,
            height: 25,
            tintColor: COLORS.black,
          }}
          style={{
            width: 40,
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: COLORS.white,
          }}
          onPress={() => navigation.goBack()}
        />
      </View>
      <View style={{flexDirection: 'row'}}>
        <ButtonIcon
          source={icons.media}
          iconStyle={{tintColor: COLORS.white}}
          style={{
            width: 50,
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        />

        <ButtonIcon
          source={icons.favourite_outline}
          iconStyle={{tintColor: COLORS.white}}
          style={{
            width: 50,
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        />
      </View>
    </View>
  );
};

const VideoSection = () => {
  const route = useRoute();
  const {selectedCourse} = route.params;
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <View
      style={{
        height: SIZES.height * 0.3,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.gray90,
      }}>
      <ImageBackground
        source={selectedCourse?.thumbnail}
        style={{
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ButtonIcon
          source={icons.play}
          style={{
            width: 55,
            height: 55,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: COLORS.primary,
          }}
          iconStyle={{width: 25, height: 25, tintColor: COLORS.white}}
          onPress={() => setIsPlaying(true)}
        />
      </ImageBackground>
      {true && (
        <View
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: 'black',
          }}>
          <Video
            muted={false}
            source={{uri: dummyData.sample_video_url}}
            controls={true}
            posterResizeMode="cover"
            style={{position: 'absolute', top: 0, bottom: 0, left: 0, right: 0}}
          />
        </View>
      )}
    </View>
  );
};
export default CourseDetailScreen;

const styles = StyleSheet.create({});
