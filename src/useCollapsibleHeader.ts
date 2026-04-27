import { useCallback, useRef } from 'react'
import { View } from 'react-native'
import { useSharedValue, useAnimatedScrollHandler } from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { COLLAPSIBLE_HEADER_HEIGHT } from './CollapsibleHeader'

const SCROLL_EVENT_THROTTLE = 16

type UseCollapsibleHeaderOptions = {
  headerHeight?: number
}

export const useCollapsibleHeader = ({ headerHeight = COLLAPSIBLE_HEADER_HEIGHT }: UseCollapsibleHeaderOptions = {}) => {
  const { top } = useSafeAreaInsets()

  const scrollY = useSharedValue(0)
  const titleScrollThreshold = useSharedValue(0)
  const titleRef = useRef<View>(null)

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y
    }
  })

  const handleTitleLayout = useCallback(() => {
    titleRef.current?.measureInWindow((_x, windowY, _w, height) => {
      titleScrollThreshold.value = windowY + height - (top + headerHeight)
    })
  }, [top, headerHeight])

  return {
    scrollY,
    titleScrollThreshold,
    titleRef,
    handleTitleLayout,
    scrollViewProps: {
      onScroll: scrollHandler,
      scrollEventThrottle: SCROLL_EVENT_THROTTLE
    }
  }
}
