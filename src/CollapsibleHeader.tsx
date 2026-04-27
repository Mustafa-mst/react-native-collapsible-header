import { memo, ReactNode } from 'react'
import { StyleProp, StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native'
import Animated, {
  Extrapolation,
  SharedValue,
  interpolate,
  useAnimatedStyle
} from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const DEFAULT_SCROLL_THRESHOLD_START = 50
const DEFAULT_SCROLL_THRESHOLD_END = 120
const TITLE_TRANSLATE_Y = 10

export const COLLAPSIBLE_HEADER_HEIGHT = 48

export type CollapsibleHeaderProps = {
  scrollY: SharedValue<number>
  titleScrollThreshold: SharedValue<number>
  title: string
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  backgroundColor?: string
  scrollThresholdStart?: number
  scrollThresholdEnd?: number
  headerHeight?: number
  containerStyle?: StyleProp<ViewStyle>
  titleStyle?: StyleProp<TextStyle>
  renderTitle?: (title: string) => ReactNode
}

const CollapsibleHeaderBase: React.FC<CollapsibleHeaderProps> = ({
  scrollY,
  titleScrollThreshold,
  title,
  leftIcon,
  rightIcon,
  backgroundColor = '#ffffff',
  scrollThresholdStart = DEFAULT_SCROLL_THRESHOLD_START,
  scrollThresholdEnd = DEFAULT_SCROLL_THRESHOLD_END,
  headerHeight = COLLAPSIBLE_HEADER_HEIGHT,
  containerStyle,
  titleStyle,
  renderTitle
}) => {
  const { top } = useSafeAreaInsets()

  const animatedBgStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollY.value,
      [scrollThresholdStart, scrollThresholdEnd],
      [0, 1],
      Extrapolation.CLAMP
    )
    return { opacity }
  })

  const animatedTitleStyle = useAnimatedStyle(() => {
    const threshold = titleScrollThreshold.value
    if (threshold === 0) {
      return { opacity: 0, transform: [{ translateY: TITLE_TRANSLATE_Y }] }
    }

    const startTitle = threshold - 10
    const opacity = interpolate(scrollY.value, [startTitle, threshold], [0, 1], Extrapolation.CLAMP)
    const translateY = interpolate(
      scrollY.value,
      [startTitle, threshold],
      [TITLE_TRANSLATE_Y, 0],
      Extrapolation.CLAMP
    )

    return { opacity, transform: [{ translateY }] }
  })

  return (
    <Animated.View style={[styles.container, { paddingTop: top }, containerStyle]}>
      <Animated.View
        style={[StyleSheet.absoluteFillObject, { backgroundColor }, animatedBgStyle]}
      />
      <View style={[styles.content, { height: headerHeight }]}>
        {leftIcon ?? <View style={styles.iconPlaceholder} />}
        <Animated.View style={[styles.titleWrapper, animatedTitleStyle]}>
          {renderTitle ? (
            renderTitle(title)
          ) : (
            <Text style={[styles.title, titleStyle]} numberOfLines={1}>
              {title}
            </Text>
          )}
        </Animated.View>
        {rightIcon ?? <View style={styles.iconPlaceholder} />}
      </View>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16
  },
  titleWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8
  },
  title: {
    fontSize: 17,
    color: '#000000'
  },
  iconPlaceholder: {
    width: 24,
    height: 24
  }
})

export const CollapsibleHeader = memo(CollapsibleHeaderBase)
