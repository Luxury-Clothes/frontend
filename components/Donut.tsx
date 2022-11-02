import {
  Easing,
  TextInput,
  Animated,
  Text,
  View,
  StyleSheet,
} from 'react-native';
import { useRef, useEffect } from 'react';
import Constants from 'expo-constants';
import Svg, { G, Circle, Rect } from 'react-native-svg';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

export interface DonutProps {
  percentage?: number;
  radius?: number;
  strokeWidth?: number;
  duration?: number;
  color?: string;
  delay?: number;
  textColor?: string;
  max?: number;
  textHidden?: boolean;
  className?: string;
}

export default function Donut({
  percentage = 75,
  radius = 50,
  strokeWidth = 10,
  duration = 500,
  color = 'tomato',
  delay = 1000,
  textColor,
  max = 100,
  textHidden = false,
  className,
}: DonutProps) {
  const animated = useRef(new Animated.Value(0)).current;
  const circleRef = useRef();
  const inputRef = useRef();
  const circumference = 2 * Math.PI * radius;
  const halfCircle = radius + strokeWidth;

  const animation = (toValue) => {
    return Animated.timing(animated, {
      delay: 1000,
      toValue,
      duration,
      useNativeDriver: true,
      easing: Easing.out(Easing.ease),
    }).start(() => {
      //   animation(toValue === 0 ? percentage : 0);
    });
  };

  useEffect(() => {
    animation(percentage);
    animated.addListener(
      (v) => {
        const maxPerc = (100 * v.value) / max;

        const strokeDashoffset =
          circumference -
          (circumference * (v.value >= 100 ? 100 : v.value)) / 100;
        if (inputRef?.current) {
          // @ts-ignore
          inputRef.current.setNativeProps({
            text: textHidden
              ? ''
              : `${v.value < 0 ? '' : '+'}${Math.round(v.value)}%`,
          });
        }
        if (circleRef?.current) {
          // @ts-ignore
          circleRef.current.setNativeProps({
            strokeDashoffset,
          });
        }
      },
      //   @ts-ignore
      [max, percentage]
    );

    return () => {
      animated.removeAllListeners();
    };
  });

  return (
    <View
      className={className}
      style={{ width: radius * 2, height: radius * 2 }}
    >
      <Svg
        height={radius * 2}
        width={radius * 2}
        viewBox={`0 0 ${halfCircle * 2} ${halfCircle * 2}`}
      >
        <G rotation='-90' origin={`${halfCircle}, ${halfCircle}`}>
          <Circle
            ref={circleRef}
            cx='50%'
            cy='50%'
            r={radius}
            fill='transparent'
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap='round'
            strokeDashoffset={circumference}
            strokeDasharray={circumference}
          />
          <Circle
            cx='50%'
            cy='50%'
            r={radius}
            fill='transparent'
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinejoin='round'
            strokeOpacity='.1'
          />
        </G>
      </Svg>
      <AnimatedTextInput
        ref={inputRef}
        underlineColorAndroid='transparent'
        editable={false}
        defaultValue=''
        style={[
          StyleSheet.absoluteFillObject,
          { fontSize: radius / 3, color: textColor ?? color },
          styles.text,
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  text: { fontWeight: '900', textAlign: 'center' },
});
