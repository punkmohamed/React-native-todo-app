import React from 'react';
import Svg, { Circle, Defs, LinearGradient, Path, Stop } from 'react-native-svg';

type Props = {
  size?: number;
};

export default function Logo({ size = 40 }: Props) {
  const s = size;
  return (
    <Svg width={s} height={s} viewBox="0 0 64 64" fill="none">
      <Defs>
        <LinearGradient id="brandGrad" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0%" stopColor="#4F46E5" stopOpacity="1" />
          <Stop offset="100%" stopColor="#06B6D4" stopOpacity="1" />
        </LinearGradient>
      </Defs>

      <Circle cx={32} cy={32} r={28} stroke="url(#brandGrad)" strokeWidth={4} fill="none" />

      <Circle cx={32} cy={32} r={23} fill="#FFFFFF" />

      <Path
        d="M22 34 L30 42 L44 26"
        stroke="url(#brandGrad)"
        strokeWidth={5}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      <Circle cx={48} cy={18} r={4} fill="#4F46E5" opacity={0.18} />
    </Svg>
  );
}
