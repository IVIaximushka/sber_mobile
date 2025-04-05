declare module 'react-native-mjpeg' {
  import { Component } from 'react';
  import { ViewStyle, ImageSourcePropType } from 'react-native';

  interface MjpegProps {
    source: ImageSourcePropType;
    style?: ViewStyle;
    resizeMode?: 'cover' | 'contain' | 'stretch' | 'center';
    isPlaying?: boolean;
  }

  export default class Mjpeg extends Component<MjpegProps> {}
} 