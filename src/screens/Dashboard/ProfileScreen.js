import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import globalStyle from '../../styles/global.style';
import {
  SIZES,
  FONTS,
  COLORS,
  icons,
  images,
  darkTheme,
  lightTheme,
} from '../../constants';
import {
  ButtonIcon,
  ButtonText,
  Divider,
  ProfileRadioButton,
  ProfileValue,
  ProgressBar,
} from '../../components';
import {ScrollView} from 'react-native-gesture-handler';
import {Image} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {changeTheme} from '../../redux/slice/app.slice';

const ProfileScreen = () => {
  const [newCourseNotification, setNewCourseNotification] = useState(true);
  const [studyReminder, setStudyReminder] = useState(true);
  const appTheme = useSelector(state => state.app.appTheme);
  const dispatch = useDispatch();
  const handleToggleThemePress = () => {
    if (appTheme.name === darkTheme.name) {
      dispatch(changeTheme(lightTheme.name));
    } else {
      dispatch(changeTheme(darkTheme.name));
    }
  };
  return (
    <SafeAreaView
      style={[
        globalStyle.container,
        {backgroundColor: appTheme.backgroundColor1},
      ]}>
      <CustomHeader handleToggleThemePress={handleToggleThemePress} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        overScrollMode="never"
        contentContainerStyle={styles.scrollView}>
        {/* profile card */}
        <ProfileCard />
        {/* profile section */}
        <ProfileSection1 />
        <ProfileSection2
          newCourseNotification={newCourseNotification}
          setNewCourseNotification={setNewCourseNotification}
          setStudyReminder={setStudyReminder}
          studyReminder={studyReminder}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const ProfileSection1 = () => {
  return (
    <View style={styles.profileSectionContainer}>
      <ProfileValue icon={icons.profile} label={'Name'} value={'User'} />
      <Divider />
      <ProfileValue
        icon={icons.email}
        label={'Email'}
        value={'User@gmail.com'}
      />
      <Divider />
      <ProfileValue
        icon={icons.email}
        label={'Password'}
        value={'Updated 2 weeks ago'}
      />
      <Divider />
      <ProfileValue
        icon={icons.call}
        label={'Contact Number'}
        value={'+1234567'}
      />
    </View>
  );
};

const ProfileSection2 = ({
  newCourseNotification,
  setNewCourseNotification,
  studyReminder,
  setStudyReminder,
}) => {
  return (
    <View style={styles.profileSectionContainer}>
      <ProfileValue icon={icons.star_1} value={'Page'} />
      <Divider />
      <ProfileRadioButton
        icon={icons.new_icon}
        label={'New Course Notification'}
        isSelected={newCourseNotification}
        onPress={() => setNewCourseNotification(pre => !pre)}
      />
      <Divider />
      <ProfileRadioButton
        icon={icons.new_icon}
        label={'Study Reminder'}
        isSelected={studyReminder}
        onPress={() => setStudyReminder(pre => !pre)}
      />
    </View>
  );
};

const ProfileCard = () => {
  return (
    <View style={styles.profileCard}>
      {/* Profile image */}
      <TouchableOpacity style={{width: 80, height: 80}}>
        <Image source={images.profile} style={styles.profileImage} />

        <View style={styles.profileCameraWrapper}>
          <View style={styles.profileCameraContainer}>
            <Image
              source={icons.camera}
              resizeMode="contain"
              style={{width: 17, height: 17}}
            />
          </View>
        </View>
      </TouchableOpacity>

      {/* Detail */}
      <View style={styles.detailWrapper}>
        <Text style={{color: COLORS.white, ...FONTS.h2}}>User</Text>
        <Text style={{color: COLORS.white, ...FONTS.body4}}>
          React Native Developer
        </Text>
        {/* progress */}
        <ProgressBar
          containerStyle={{
            marginTop: SIZES.radius,
          }}
          progress={'58%'}
        />
        <View style={styles.overallProgress}>
          <Text style={styles.overallProgressText}>Overall Progress</Text>
          <Text style={{color: COLORS.white}}>58%</Text>
        </View>

        <ButtonText
          label={'+ Become Memeber'}
          style={styles.becomeMember}
          labelStyle={{color: COLORS.white}}
        />
      </View>
    </View>
  );
};

const CustomHeader = ({handleToggleThemePress}) => {
  const appTheme = useSelector(state => state.app.appTheme);

  return (
    <View style={styles.container}>
      <Text
        style={{
          ...FONTS.h1,
          color: appTheme.textColor,
        }}>
        Profile
      </Text>
      <ButtonIcon
        onPress={handleToggleThemePress}
        source={icons.sun}
        iconColor={appTheme.tintColor}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: SIZES.padding,
    paddingTop: SIZES.padding,
    justifyContent: 'space-between',
  },
  overallProgressText: {flex: 1, color: COLORS.white, ...FONTS.body4},
  becomeMember: {
    marginTop: SIZES.padding,
    paddingHorizontal: SIZES.radius,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
  },
  overallProgress: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailWrapper: {flex: 1, marginLeft: SIZES.radius, alignItems: 'flex-start'},
  profileCameraContainer: {
    width: 30,
    height: 30,
    marginBottom: -15,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    backgroundColor: COLORS.primary,
  },
  profileCameraWrapper: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 40,
    borderWidth: 1,
    borderColor: COLORS.white,
  },
  profileCard: {
    flexDirection: 'row',
    marginTop: SIZES.padding,
    padding: SIZES.padding,
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.primary3,
  },
  scrollView: {
    paddingHorizontal: SIZES.padding,
    paddingBottom: 100,
  },
  profileSectionContainer: {
    marginTop: SIZES.padding,
    paddingHorizontal: SIZES.padding,
    borderWidth: 1,
    borderRadius: SIZES.radius,
    borderColor: COLORS.gray20,
  },
});

export default ProfileScreen;
