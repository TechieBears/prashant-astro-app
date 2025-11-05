import React, { useCallback, useMemo, useRef, useState } from 'react';
import { View, Text, StyleSheet, PanResponder } from 'react-native';

const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
const roundToStep = (v, step) => Math.round(v / step) * step;

const PriceRangeSlider = ({
  min,
  max,
  low,
  high,
  step = 1,
  minRange = 0,
  onValueChange,
  style,
}) => {
  const [trackW, setTrackW] = useState(0);
  const [lowLabelWidth, setLowLabelWidth] = useState(LABEL_MIN_WIDTH);
  const [highLabelWidth, setHighLabelWidth] = useState(LABEL_MIN_WIDTH);

  const range = Math.max(1, max - min);
  const baseLabelWidth = Math.max(
    THUMB_SIZE + LABEL_H_PADDING * 2,
    LABEL_MIN_WIDTH
  );
  const lowLabelVisualWidth = Math.max(lowLabelWidth, baseLabelWidth);
  const highLabelVisualWidth = Math.max(highLabelWidth, baseLabelWidth);

  // map value <-> x (pixels)
  const valueToX = useCallback(
    (val) => {
      if (trackW <= 0) return 0;
      return ((val - min) / range) * trackW;
    },
    [min, range, trackW]
  );

  const xToValue = useCallback(
    (x) => {
      if (trackW <= 0) return min;
      const raw = min + (clamp(x, 0, trackW) / trackW) * range;
      return clamp(roundToStep(raw, step), min, max);
    },
    [min, max, range, step, trackW]
  );

  // live dragging values (so UI feels immediate even if parent is heavy)
  const dragLow = useRef(low);
  const dragHigh = useRef(high);

  const applyLow = useCallback(
    (next) => {
      const minAllowed = min;
      const maxAllowed = Math.max(minAllowed, dragHigh.current - minRange);
      const snapped = clamp(roundToStep(next, step), minAllowed, maxAllowed);
      if (snapped !== dragLow.current) {
        dragLow.current = snapped;
        onValueChange(snapped, dragHigh.current);
      }
    },
    [min, minRange, onValueChange, step]
  );

  const applyHigh = useCallback(
    (next) => {
      const maxAllowed = max;
      const minAllowed = Math.min(maxAllowed, dragLow.current + minRange);
      const snapped = clamp(roundToStep(next, step), minAllowed, maxAllowed);
      if (snapped !== dragHigh.current) {
        dragHigh.current = snapped;
        onValueChange(dragLow.current, snapped);
      }
    },
    [max, minRange, onValueChange, step]
  );

  // keep drag refs in sync when props change externally
  if (dragLow.current !== low) dragLow.current = low;
  if (dragHigh.current !== high) dragHigh.current = high;

  const onLayoutTrack = (e) => {
    setTrackW(e.nativeEvent.layout.width);
  };

  // positions
  const lowX = valueToX(low);
  const highX = valueToX(high);

  const {
    lowBubbleCenter,
    highBubbleCenter,
    lowThumbCenter,
    highThumbCenter,
  } = useMemo(() => {
    if (trackW <= 0) {
      return {
        lowBubbleCenter: lowX,
        highBubbleCenter: highX,
        lowThumbCenter: lowX,
        highThumbCenter: highX,
      };
    }

    const halfLow = lowLabelVisualWidth / 2;
    const halfHigh = highLabelVisualWidth / 2;
    const minGap = halfLow + halfHigh + LABEL_GAP_BUFFER;

    const clampCenter = (center, half) =>
      clamp(center, half, trackW - half);

    let lowCenter = clampCenter(lowX, halfLow);
    let highCenter = clampCenter(highX, halfHigh);

    if (highCenter - lowCenter < minGap) {
      const mid = (lowCenter + highCenter) / 2;
      lowCenter = clampCenter(mid - minGap / 2, halfLow);
      highCenter = clampCenter(mid + minGap / 2, halfHigh);

      if (highCenter - lowCenter < minGap) {
        if (lowCenter === halfLow) {
          highCenter = clampCenter(lowCenter + minGap, halfHigh);
        } else if (highCenter === trackW - halfHigh) {
          lowCenter = clampCenter(highCenter - minGap, halfLow);
        }
      }
    }

    const lowThumbCenter = clamp(lowX, THUMB_SIZE / 2, trackW - THUMB_SIZE / 2);
    const highThumbCenter = clamp(
      highX,
      THUMB_SIZE / 2,
      trackW - THUMB_SIZE / 2
    );

    return {
      lowBubbleCenter: lowCenter,
      highBubbleCenter: highCenter,
      lowThumbCenter,
      highThumbCenter,
    };
  }, [highLabelVisualWidth, highX, lowLabelVisualWidth, lowX, trackW]);

  // PanResponders for each thumb
  const lowPan = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderGrant: () => {
          dragLow.current = low;
          dragHigh.current = high;
        },
        onPanResponderMove: (_, g) => {
          const x = lowX + g.dx;
          const nextVal = xToValue(x);
          applyLow(nextVal);
        },
      }),
    [low, high, lowX, xToValue, applyLow]
  );

  const highPan = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderGrant: () => {
          dragLow.current = low;
          dragHigh.current = high;
        },
        onPanResponderMove: (_, g) => {
          const x = highX + g.dx;
          const nextVal = xToValue(x);
          applyHigh(nextVal);
        },
      }),
    [low, high, highX, xToValue, applyHigh]
  );

  return (
    <View style={[styles.container, style]}>
      {/* Track */}
      <View style={styles.trackContainer} onLayout={onLayoutTrack}>
        <View style={styles.rail} />
        {/* Selected segment */}
        <View
          style={[
            styles.selected,
            { left: Math.min(lowX, highX), width: Math.abs(highX - lowX) },
          ]}
        />

        {/* Low Thumb */}
        <View
          style={[
            styles.thumbWrap,
            {
              left: lowThumbCenter,
              marginLeft: -TOUCH_WIDTH / 2,
            },
          ]}
          {...lowPan.panHandlers}
        >
          <View style={styles.thumb} />
          <View
            style={[
              styles.valueWrapper,
              {
                minWidth: lowLabelVisualWidth,
                transform: [{ translateX: lowBubbleCenter - lowThumbCenter }],
              },
            ]}
            onLayout={(e) => {
              const w = e.nativeEvent.layout.width;
              if (Math.abs(w - lowLabelWidth) >= 1) {
                setLowLabelWidth(w);
              }
            }}
          >
            <Text style={styles.valueText} numberOfLines={1}>
              ₹{low}
            </Text>
          </View>
        </View>

        {/* High Thumb */}
        <View
          style={[
            styles.thumbWrap,
            {
              left: highThumbCenter,
              marginLeft: -TOUCH_WIDTH / 2,
            },
          ]}
          {...highPan.panHandlers}
        >
          <View style={styles.thumb} />
          <View
            style={[
              styles.valueWrapper,
              {
                minWidth: highLabelVisualWidth,
                transform: [{ translateX: highBubbleCenter - highThumbCenter }],
              },
            ]}
            onLayout={(e) => {
              const w = e.nativeEvent.layout.width;
              if (Math.abs(w - highLabelWidth) >= 1) {
                setHighLabelWidth(w);
              }
            }}
          >
            <Text style={styles.valueText} numberOfLines={1}>
              ₹{high}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const THUMB_SIZE = 22;
const LABEL_H_PADDING = 14;
const LABEL_MIN_WIDTH = 84;
const LABEL_GAP_BUFFER = 8;
const TOUCH_WIDTH = Math.max(72, THUMB_SIZE + 24);

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
  },
  trackContainer: {
    height: 48, // gives room for thumbs; values sit above
    justifyContent: 'center',
  },
  rail: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 6,
    borderRadius: 999,
    backgroundColor: '#DDE5EF',
  },
  selected: {
    position: 'absolute',
    height: 6,
    borderRadius: 999,
    backgroundColor: '#FF8A00',
  },
  thumbWrap: {
    position: 'absolute',
    top: (48 - THUMB_SIZE) / 2,
    width: TOUCH_WIDTH,
    height: THUMB_SIZE + 32, // extra room for label
    alignItems: 'center',
    overflow: 'visible',
  },
  thumb: {
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    borderRadius: THUMB_SIZE / 2,
    backgroundColor: '#FF8A00',
    elevation: 2,
  },
  valueWrapper: {
    marginTop: 10,
    minWidth: LABEL_MIN_WIDTH,
    paddingHorizontal: LABEL_H_PADDING,
    paddingVertical: 4,
    borderRadius: 10,
    borderCurve: 'continuous',
    backgroundColor: '#FF8A00',
    alignItems: 'center',
    justifyContent: 'center',
  },
  valueText: {
    color: '#FFFFFF',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 12,
    textAlign: 'center',
  },
});

export default PriceRangeSlider;
