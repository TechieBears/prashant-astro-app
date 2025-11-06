import React, {memo} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import SwitchToggle from 'react-native-switch-toggle';

const SWITCH_GRADIENT_COLORS = ['#FFB347', '#FF5E57'];
const ACTIVE_LEFT_GRADIENT = ['#FF9334', '#FFFFFF'];
const ACTIVE_RIGHT_GRADIENT = ['#FFFFFF', '#FF9334'];

const TRACK_WIDTH = 78;
const TRACK_HEIGHT = 34;
const TRACK_RADIUS = TRACK_HEIGHT / 2;
const THUMB_SIZE = TRACK_HEIGHT - 4;

const DualToggleSwitch = ({
  value = 'left',
  onChange,
  leftLabel = 'Left',
  rightLabel = 'Right',
}) => {
  const isRightActive = value === 'right';

  const handleToggle = () => {
    const next = isRightActive ? 'left' : 'right';
    onChange?.(next);
  };

  return (
    <View className="relative flex-row items-center bg-white rounded-[34px] border border-[#D7DBE2] overflow-hidden">
      <View className="flex-1">
        <LinearGradient
          colors={ACTIVE_LEFT_GRADIENT}
          start={{x: 0, y: 0.5}}
          end={{x: 1, y: 0.5}}
          style={[styles.sideFill, isRightActive && styles.sideHidden]}
        />
        <View className="w-full py-3 items-center justify-center">
          <Text
            className={`font-poppins text-[17px] ${
              value === 'left'
                ? 'text-[#333D4E] font-poppinsSemiBold'
                : 'text-[#606980]'
            }`}>
            {leftLabel}
          </Text>
        </View>
      </View>

      <View className="flex-1">
        <LinearGradient
          colors={ACTIVE_RIGHT_GRADIENT}
          start={{x: 0, y: 0.5}}
          end={{x: 1, y: 0.5}}
          style={[styles.sideFill, !isRightActive && styles.sideHidden]}
        />
        <View className="w-full py-3 items-center justify-center">
          <Text
            className={`font-poppins text-[17px] ${
              value === 'right'
                ? 'text-[#333D4E] font-poppinsSemiBold'
                : 'text-[#606980]'
            }`}>
            {rightLabel}
          </Text>
        </View>
      </View>

      <View className="absolute inset-y-0 left-1/2 -translate-x-1/2 justify-center items-center z-20">
        <LinearGradient
          colors={SWITCH_GRADIENT_COLORS}
          start={{x: 0, y: 0.5}}
          end={{x: 1, y: 0.5}}
          style={styles.switchBackground}
        />
        <SwitchToggle
          switchOn={isRightActive}
          onPress={handleToggle}
          backgroundColorOn="transparent"
          backgroundColorOff="transparent"
          circleColorOn="#FFFFFF"
          circleColorOff="#FFFFFF"
          containerStyle={styles.switchContainer}
          circleStyle={styles.switchThumb}
          duration={160}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sideFill: {
    ...StyleSheet.absoluteFillObject,
  },
  sideHidden: {
    opacity: 0,
  },
  switchBackground: {
    position: 'absolute',
    width: TRACK_WIDTH,
    height: TRACK_HEIGHT,
    borderRadius: TRACK_RADIUS,
  },
  switchContainer: {
    width: TRACK_WIDTH,
    height: TRACK_HEIGHT,
    borderRadius: TRACK_RADIUS,
    padding: 2,
    backgroundColor: 'transparent',
  },
  switchThumb: {
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    borderRadius: THUMB_SIZE / 2,
    backgroundColor: '#FFFFFF',
    elevation: 3,
    shadowColor: 'rgba(0,0,0,0.15)',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});

export default memo(DualToggleSwitch);
