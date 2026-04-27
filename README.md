# rn-collapsible-header

A lightweight, animated collapsible header for React Native. The background fades in and the title slides into view as the user scrolls — no native code required.

## Installation

```sh
npm install rn-collapsible-header
```

Peer dependencies:

```sh
npm install react-native-reanimated react-native-safe-area-context
```

Make sure Reanimated is configured per its [installation guide](https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/installation), and that your app is wrapped in `SafeAreaProvider`.

## Usage

```tsx
import { useRef } from 'react'
import { Animated as RNAnimated, ScrollView, View, Text } from 'react-native'
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated'
import { CollapsibleHeader } from 'rn-collapsible-header'

export default function Screen() {
  const scrollY = useSharedValue(0)
  const titleScrollThreshold = useSharedValue(120)

  const onScroll = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y
  })

  return (
    <View style={{ flex: 1 }}>
      <CollapsibleHeader
        scrollY={scrollY}
        titleScrollThreshold={titleScrollThreshold}
        title="My Screen"
        leftIcon={<BackButton />}
        rightIcon={<MenuButton />}
      />
      <Animated.ScrollView onScroll={onScroll} scrollEventThrottle={16}>
        {/* content */}
      </Animated.ScrollView>
    </View>
  )
}
```

To make the title appear exactly when a specific element scrolls past the header, measure that element's `y` and set:

```ts
titleScrollThreshold.value = measuredY
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `scrollY` | `SharedValue<number>` | required | Current vertical scroll offset. |
| `titleScrollThreshold` | `SharedValue<number>` | required | Scroll position at which the title becomes fully visible. Set `0` to keep it hidden. |
| `title` | `string` | required | Header title text. |
| `leftIcon` | `ReactNode` | required | Element rendered on the left (e.g. back button). |
| `rightIcon` | `ReactNode` | — | Element rendered on the right. A placeholder is rendered if omitted. |
| `backgroundColor` | `string` | `'#ffffff'` | Background color that fades in. |
| `scrollThresholdStart` | `number` | `50` | Scroll offset where the background begins to fade in. |
| `scrollThresholdEnd` | `number` | `120` | Scroll offset where the background reaches full opacity. |
| `containerStyle` | `StyleProp<ViewStyle>` | — | Extra styles for the outer container. |
| `titleStyle` | `StyleProp<TextStyle>` | — | Extra styles for the default title text. |
| `renderTitle` | `(title: string) => ReactNode` | — | Custom title renderer. Overrides the default `Text`. |

## License

MIT
