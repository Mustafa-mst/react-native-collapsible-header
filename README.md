# rn-collapsible-header

A lightweight animated collapsible header for React Native. The background fades in and the title slides into view as the user scrolls.

## Installation

```sh
npm install rn-collapsible-header
```

**Peer dependencies:**

```sh
npm install react-native-reanimated react-native-safe-area-context
```

Make sure Reanimated is configured per its [installation guide](https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/installation), and your app is wrapped in `<SafeAreaProvider>`.

---

## Usage

The easiest way is to use the bundled `useCollapsibleHeader` hook together with the `CollapsibleHeader` component.

```tsx
import Animated from 'react-native-reanimated'
import { CollapsibleHeader, useCollapsibleHeader } from 'rn-collapsible-header'

export default function MyScreen() {
  const { scrollY, titleScrollThreshold, scrollViewProps, titleRef, handleTitleLayout } =
    useCollapsibleHeader()

  return (
    <View style={{ flex: 1 }}>
      <CollapsibleHeader
        scrollY={scrollY}
        titleScrollThreshold={titleScrollThreshold}
        title="My Screen"
        leftIcon={<BackButton />}
        rightIcon={<SettingsButton />}
      />

      <Animated.ScrollView {...scrollViewProps}>
        {/* Attach ref and onLayout to the large title element */}
        <Text ref={titleRef} style={styles.pageTitle} onLayout={handleTitleLayout}>
          My Screen
        </Text>

        {/* rest of content */}
      </Animated.ScrollView>
    </View>
  )
}
```

### How `handleTitleLayout` works

Pass `onLayout={handleTitleLayout}` to the large title element in your scroll content (usually an `<h1>`-like `Text`). The hook measures its position and automatically sets the scroll threshold so the header title appears exactly when that element scrolls past the header.

---

## API

### `useCollapsibleHeader()`

Returns everything you need to wire up the header and scroll view.

| Return value | Type | Description |
| --- | --- | --- |
| `scrollY` | `SharedValue<number>` | Current vertical scroll offset. Pass to `CollapsibleHeader`. |
| `titleScrollThreshold` | `SharedValue<number>` | Auto-calculated threshold. Pass to `CollapsibleHeader`. |
| `scrollViewProps` | `object` | Spread onto `Animated.ScrollView` (`onScroll` + `scrollEventThrottle`). |
| `titleRef` | `RefObject<View>` | Attach to your large title element via `ref`. |
| `handleTitleLayout` | `() => void` | Pass as `onLayout` to your large title element. |

---

### `<CollapsibleHeader />`

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `scrollY` | `SharedValue<number>` | required | Current scroll offset. |
| `titleScrollThreshold` | `SharedValue<number>` | required | Offset at which the title becomes fully visible. `0` keeps it hidden. |
| `title` | `string` | required | Header title text. |
| `leftIcon` | `ReactNode` | required | Left element (e.g. back button). |
| `rightIcon` | `ReactNode` | — | Right element. A placeholder is rendered if omitted. |
| `backgroundColor` | `string` | `'#ffffff'` | Background color that fades in on scroll. |
| `scrollThresholdStart` | `number` | `50` | Scroll offset where background starts fading in. |
| `scrollThresholdEnd` | `number` | `120` | Scroll offset where background reaches full opacity. |
| `containerStyle` | `StyleProp<ViewStyle>` | — | Extra styles for the outer container. |
| `titleStyle` | `StyleProp<TextStyle>` | — | Extra styles for the default title `Text`. |
| `renderTitle` | `(title: string) => ReactNode` | — | Custom title renderer — overrides the default `Text`. |

---

## License

MIT
