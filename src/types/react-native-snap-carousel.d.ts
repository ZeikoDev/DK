declare module 'react-native-snap-carousel' {
  import { Component } from 'react';
  import {
    ScrollViewProps,
    ViewStyle,
    NativeSyntheticEvent,
    NativeScrollEvent,
    StyleProp,
  } from 'react-native';

  export interface AdditionalParallaxProps {
    carouselRef?: any;
    itemHeight?: number;
    itemWidth?: number;
    scrollPosition?: any;
    sliderHeight?: number;
    sliderWidth?: number;
    vertical?: boolean;
  }

  export interface CarouselProps {
    activeAnimationOptions?: object;
    activeAnimationType?: 'decay' | 'spring' | 'timing';
    activeSlideAlignment?: 'center' | 'end' | 'start';
    activeSlideOffset?: number;
    apparitionDelay?: number;
    autoplay?: boolean;
    autoplayDelay?: number;
    autoplayInterval?: number;
    callbackOffsetMargin?: number;
    containerCustomStyle?: StyleProp<ViewStyle>;
    contentContainerCustomStyle?: StyleProp<ViewStyle>;
    enableMomentum?: boolean;
    enableSnap?: boolean;
    firstItem?: number;
    hasParallaxImages?: boolean;
    inactiveSlideOpacity?: number;
    inactiveSlideScale?: number;
    inactiveSlideShift?: number;
    initialScrollIndex?: number;
    layout?: 'default' | 'stack' | 'tinder';
    lockScrollTimeoutDuration?: number;
    lockScrollWhileSnapping?: boolean;
    loop?: boolean;
    loopClonesPerSide?: number;
    scrollEnabled?: boolean;
    scrollInterpolator?: (index: number, props: CarouselProps) => object;
    slideInterpolatedStyle?: (index: number, animatedValue: any, props: CarouselProps) => object;
    slideStyle?: StyleProp<ViewStyle>;
    shouldOptimizeUpdates?: boolean;
    swipeThreshold?: number;
    useScrollView?: boolean;
    vertical?: boolean;
    data: any[];
    renderItem: (item: { item: any; index: number }) => React.ReactNode;
    itemWidth: number;
    itemHeight?: number;
    sliderWidth: number;
    sliderHeight?: number;
    onBeforeSnapToItem?: (index: number) => void;
    onSnapToItem?: (index: number) => void;
  }

  export interface ParallaxImageProps {
    containerStyle?: StyleProp<ViewStyle>;
    dimensions?: { width: number; height: number };
    parallaxFactor?: number;
    showSpinner?: boolean;
    spinnerColor?: string;
    sliderHeight?: number;
    sliderWidth?: number;
    source: { uri: string } | number;
    fadeDuration?: number;
  }

  export class Carousel<T> extends Component<CarouselProps & ScrollViewProps> {
    snapToItem: (index: number, animated?: boolean, fireCallback?: boolean) => void;
    snapToNext: (animated?: boolean) => void;
    snapToPrev: (animated?: boolean) => void;
    triggerRenderingHack: (offset?: number) => void;
    startAutoplay: (instantly?: boolean) => void;
    stopAutoplay: () => void;
  }

  export class ParallaxImage extends Component<ParallaxImageProps & AdditionalParallaxProps> {}
  export class Pagination extends Component<any> {}

  export default Carousel;
}
