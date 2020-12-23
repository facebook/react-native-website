---
id: text-style-props
title: Text 样式属性
---

##### 本文档贡献者：[sunnylqm](https://github.com/search?q=sunnylqm&type=Users)(99.80%), [sunnylqm](https://github.com/search?q=sunnylqm&type=Users)(0.20%)

### 示例

```SnackPlayer name=TextStyleProps&supportedPlatforms=android,ios
import React, { useState } from "react";
import { FlatList, Platform, ScrollView, Slider, StyleSheet, Switch, Text, TouchableWithoutFeedback, View } from "react-native";
import Constants from "expo-constants";
const fontStyles = ["normal", "italic"];
const fontVariants = [
  undefined,
  "small-caps",
  "oldstyle-nums",
  "lining-nums",
  "tabular-nums",
  "proportional-nums"
];
const fontWeights = [
  "normal",
  "bold",
  "100",
  "200",
  "300",
  "400",
  "500",
  "600",
  "700",
  "800",
  "900"
];
const textAlignments = ["auto", "left", "right", "center", "justify"];
const textDecorationLines = [
  "none",
  "underline",
  "line-through",
  "underline line-through"
];
const textDecorationStyles = ["solid", "double", "dotted", "dashed"];
const textTransformations = ["none", "uppercase", "lowercase", "capitalize"];
const textAlignmentsVertical = ["auto", "top", "bottom", "center"];
const writingDirections = ["auto", "ltr", "rtl"];
const App = () => {
  const [fontSize, setFontSize] = useState(10);
  const [fontStyleIdx, setFontStyleIdx] = useState(0);
  const [fontWeightIdx, setFontWeightIdx] = useState(0);
  const [lineHeight, setLineHeight] = useState(10);
  const [textAlignIdx, setTextAlignIdx] = useState(0);
  const [textDecorationLineIdx, setTextDecorationLineIdx] = useState(0);
  const [includeFontPadding, setIncludeFontPadding] = useState(false);
  const [textVerticalAlignIdx, setTextVerticalAlignIdx] = useState(0);
  const [fontVariantIdx, setFontVariantIdx] = useState(0);
  const [letterSpacing, setLetterSpacing] = useState(0);
  const [textDecorationStyleIdx, setTextDecorationStyleIdx] = useState(0);
  const [textTransformIdx, setTextTransformIdx] = useState(0);
  const [writingDirectionIdx, setWritingDirectionIdx] = useState(0);
  const [textShadowRadius, setTextShadowRadius] = useState(0);
  const [textShadowOffset, setTextShadowOffset] = useState({
    height: 0,
    width: 0
  });
  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.paragraph,
          {
            fontSize,
            fontStyle: fontStyles[fontStyleIdx],
            fontWeight: fontWeights[fontWeightIdx],
            lineHeight,
            textAlign: textAlignments[textAlignIdx],
            textDecorationLine: textDecorationLines[textDecorationLineIdx],
            textTransform: textTransformations[textTransformIdx],
            textAlignVertical: textAlignmentsVertical[textVerticalAlignIdx],
            fontVariant: [fontVariants[fontVariantIdx]],
            letterSpacing,
            includeFontPadding,
            textDecorationStyle: textDecorationStyles[textDecorationStyleIdx],
            writingDirection: writingDirections[writingDirectionIdx],
            textShadowOffset,
            textShadowRadius
          }
        ]}
      >
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. 112 Likes
      </Text>
      <ScrollView>
        <View>
          <Text>Common platform properties</Text>
          <CustomSlider
            label="Text Shadow Offset - Height"
            value={textShadowOffset.height}
            minimumValue={-40}
            maximumValue={40}
            handleValueChange={val =>
              setTextShadowOffset(prev => ({ ...prev, height: val }))
            }
          />
          <CustomSlider
            label="Text Shadow Offset - Width"
            value={textShadowOffset.width}
            minimumValue={-40}
            maximumValue={40}
            handleValueChange={val =>
              setTextShadowOffset(prev => ({ ...prev, width: val }))
            }
          />
          <CustomSlider
            label="Font Size"
            value={fontSize}
            maximumValue={40}
            handleValueChange={setFontSize}
          />
          <CustomPicker
            label="Font Style"
            data={fontStyles}
            currentIndex={fontStyleIdx}
            onSelected={setFontStyleIdx}
          />
          <CustomPicker
            label="Font Weight"
            data={fontWeights}
            currentIndex={fontWeightIdx}
            onSelected={setFontWeightIdx}
          />
          <CustomSlider
            label="Line Height"
            value={lineHeight}
            minimumValue={10}
            maximumValue={50}
            handleValueChange={setLineHeight}
          />
          <CustomPicker
            label="Text Align"
            data={textAlignments}
            currentIndex={textAlignIdx}
            onSelected={setTextAlignIdx}
          />
          <CustomPicker
            label="Text Decoration Line"
            data={textDecorationLines}
            currentIndex={textDecorationLineIdx}
            onSelected={setTextDecorationLineIdx}
          />
          <CustomSlider
            label="Text Shadow Radius"
            value={textShadowRadius}
            handleValueChange={setTextShadowRadius}
          />
          <CustomPicker
            label="Font Variant"
            data={fontVariants}
            currentIndex={fontVariantIdx}
            onSelected={setFontVariantIdx}
          />
          <CustomSlider
            label="Letter Spacing"
            step={0.1}
            value={letterSpacing}
            handleValueChange={setLetterSpacing}
          />
          <CustomPicker
            label="Text Transform"
            data={textTransformations}
            currentIndex={textTransformIdx}
            onSelected={setTextTransformIdx}
          />
        </View>
        {Platform.OS === "android" && (
          <View style={styles.platformContainer}>
            <Text style={styles.platformContainerTitle}>
              Android only properties
            </Text>
            <CustomPicker
              label="Text Vertical Align"
              data={textAlignmentsVertical}
              currentIndex={textVerticalAlignIdx}
              onSelected={setTextVerticalAlignIdx}
            />
            <CustomSwitch
              label="Include Font Padding"
              handleValueChange={setIncludeFontPadding}
              value={includeFontPadding}
            />
          </View>
        )}
        {Platform.OS === "ios" && (
          <View style={styles.platformContainer}>
            <Text style={styles.platformContainerTitle}>
              iOS only properties
            </Text>
            <CustomPicker
              label="Text Decoration Style"
              data={textDecorationStyles}
              currentIndex={textDecorationStyleIdx}
              onSelected={setTextDecorationStyleIdx}
            />
            <CustomPicker
              label="Writing Direction"
              data={writingDirections}
              currentIndex={writingDirectionIdx}
              onSelected={setWritingDirectionIdx}
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
}
const CustomSwitch = ({ label, handleValueChange, value }) => {
  return (
    <>
      <Text style={styles.title}>{label}</Text>
      <View style={{ alignItems: "flex-start" }}>
        <Switch
          trackColor={{ false: "#767577", true: "#DAA520" }}
          thumbColor={value ? "#DAA520" : "#f4f3f4"}
          onValueChange={handleValueChange}
          value={value}
        />
      </View>
    </>
  );
}
const CustomSlider = ({
  label,
  handleValueChange,
  step = 1,
  minimumValue = 0,
  maximumValue = 10,
  value
}) => {
  return (
    <>
      {label && (
        <Text style={styles.title}>{`${label} (${value.toFixed(2)})`}</Text>
      )}
      <View style={styles.wrapperHorizontal}>
        <Slider
          thumbTintColor="#DAA520"
          minimumTrackTintColor="#DAA520"
          minimumValue={minimumValue}
          maximumValue={maximumValue}
          step={step}
          onValueChange={handleValueChange}
          value={value}
        />
      </View>
    </>
  );
}
const CustomPicker = ({ label, data, currentIndex, onSelected }) => {
  return (
    <>
      <Text style={styles.title}>{label}</Text>
      <View style={styles.wrapperHorizontal}>
        <FlatList
          bounces
          horizontal
          data={data}
          keyExtractor={(item, idx) => String(item)}
          renderItem={({ item, index }) => {
            const selected = index === currentIndex;
            return (
              <TouchableWithoutFeedback onPress={() => onSelected(index)}>
                <View
                  style={[
                    styles.itemStyleHorizontal,
                    selected && styles.itemSelectedStyleHorizontal
                  ]}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      color: selected ? "black" : "grey",
                      fontWeight: selected ? "bold" : "normal"
                    }}
                  >
                    {item + ""}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            );
          }}
        />
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#ecf0f1",
    padding: 8
  },
  paragraph: {
    color: "black",
    textDecorationColor: "yellow",
    textShadowColor: "red",
    textShadowRadius: 1,
    margin: 24
  },
  wrapperHorizontal: {
    height: 54,
    justifyContent: "center",
    color: "black",
    marginBottom: 12
  },
  itemStyleHorizontal: {
    marginRight: 10,
    height: 50,
    padding: 8,
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 25,
    textAlign: "center",
    justifyContent: "center"
  },
  itemSelectedStyleHorizontal: {
    borderWidth: 2,
    borderColor: "#DAA520"
  },
  platformContainer: {
    marginTop: 8,
    borderTopWidth: 1
  },
  platformContainerTitle: {
    marginTop: 8
  },
  title: {
    fontWeight: "bold",
    marginVertical: 4
  }
});
export default App;
```

# 文档

## Props

### `textShadowOffset`

| 类型                                   | 必填 |
| -------------------------------------- | ---- |
| object: {width: number,height: number} | 否   |

---

### `color`

| 类型               | 必填 |
| ------------------ | ---- |
| [color](colors.md) | 否   |

---

### `fontSize`

| 类型   | 必填 |
| ------ | ---- |
| number | 否   |

---

### `fontStyle`

| 类型                     | 必填 |
| ------------------------ | ---- |
| enum('normal', 'italic') | 否   |

---

### `fontWeight`

Specifies font weight. The values 'normal' and 'bold' are supported for most fonts. Not all fonts have a variant for each of the numeric values, in that case the closest one is chosen.

| 类型                                                                                  | 必填 |
| ------------------------------------------------------------------------------------- | ---- |
| enum('normal', 'bold', '100', '200', '300', '400', '500', '600', '700', '800', '900') | 否   |

---

### `lineHeight`

| 类型   | 必填 |
| ------ | ---- |
| number | 否   |

---

### `textAlign`

Specifies text alignment. The value 'justify' is only supported on iOS and fallbacks to `left` on Android.

| 类型                                               | 必填 |
| -------------------------------------------------- | ---- |
| enum('auto', 'left', 'right', 'center', 'justify') | 否   |

---

### `textDecorationLine`

| 类型                                                                | 必填 |
| ------------------------------------------------------------------- | ---- |
| enum('none', 'underline', 'line-through', 'underline line-through') | 否   |

---

### `textShadowColor`

| 类型               | 必填 |
| ------------------ | ---- |
| [color](colors.md) | 否   |

---

### `fontFamily`

| 类型   | 必填 |
| ------ | ---- |
| string | 否   |

---

### `textShadowRadius`

| 类型   | 必填 |
| ------ | ---- |
| number | 否   |

---

### `includeFontPadding`

Set to `false` to remove extra font padding intended to make space for certain ascenders / descenders. With some fonts, this padding can make text look slightly misaligned when centered vertically. For best results also set `textAlignVertical` to `center`. Default is true.

| 类型 | 必填 | 平台    |
| ---- | ---- | ------- |
| bool | 否   | Android |

---

### `textAlignVertical`

| 类型                                    | 必填 | 平台    |
| --------------------------------------- | ---- | ------- |
| enum('auto', 'top', 'bottom', 'center') | 否   | Android |

---

### `fontVariant`

| 类型                                                                                             | 必填 | 平台                |
| ------------------------------------------------------------------------------------------------ | ---- | ------------------- |
| array of enum('small-caps', 'oldstyle-nums', 'lining-nums', 'tabular-nums', 'proportional-nums') | 否   | iOS, Android >= 5.0 |

---

### `letterSpacing`

| 类型   | 必填 | 平台                |
| ------ | ---- | ------------------- |
| number | 否   | iOS, Android >= 5.0 |

---

### `textDecorationColor`

| 类型               | 必填 | 平台 |
| ------------------ | ---- | ---- |
| [color](colors.md) | 否   | iOS  |

---

### `textDecorationStyle`

| 类型                                        | 必填 | 平台 |
| ------------------------------------------- | ---- | ---- |
| enum('solid', 'double', 'dotted', 'dashed') | 否   | iOS  |

---

### `textTransform`

| 类型                                                 | 必填 |
| ---------------------------------------------------- | ---- |
| enum('none', 'uppercase', 'lowercase', 'capitalize') | No   |

---

### `writingDirection`

| 类型                       | 必填 | 平台 |
| -------------------------- | ---- | ---- |
| enum('auto', 'ltr', 'rtl') | 否   | iOS  |
