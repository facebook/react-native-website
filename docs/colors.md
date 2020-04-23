---
id: colors
title: Color Reference
---

Components in React Native are [styled using JavaScript](style). Color properties usually match how [CSS works on the web](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value). General guides on the color usage on each platform could be found below:

- [Android](https://material.io/design/color/color-usage.html)
- [iOS](https://developer.apple.com/design/human-interface-guidelines/ios/visual-design/color/)

## Color APIs

React Native has several color APIs designed to allow you to take full advantage of your platform's design and user preferences.

- [PlatformColor](platformcolor) lets you reference the platform's color system.
- [DynamicColorIOS](dynamiccolorios) is iOS specific and allows you to specify which colors should be used in light or Dark Mode.

## Color representations

### Red Green Blue (RGB)

React Native supports `rgb()` and `rgba()` in both hexadecimal and functional notation:

- `'#f0f'` (#rgb)
- `'#ff00ff'` (#rrggbb)
- `'#f0ff'` (#rgba)
- `'#ff00ff00'` (#rrggbbaa)
- `'rgb(255, 0, 255)'`
- `'rgba(255, 0, 255, 1.0)'`

### Hue Saturation Lightness (HSL)

React Native supports `hsl()` and `hsla()` in functional notation:

- `'hsl(360, 100%, 100%)'`
- `'hsla(360, 100%, 100%, 1.0)'`

### Color ints

React Native supports also colors as an `int` values (in RGB color mode):

- `0xff00ff00` (0xrrggbbaa)

> **_Note:_** This might appear similar to the Android [Color](https://developer.android.com/reference/android/graphics/Color) ints representation but on Android values are stored in SRGB color mode (0xaarrggbb).

### Named colors

In React Native you can also use color name strings as values.

> **_Note:_** React Native only supports lowercase color names. Uppercase color names are not supported.

#### `transparent`

This is a shortcut for `rgba(0,0,0,0)`, same like in [CSS3](https://www.w3.org/TR/css-color-3/#transparent).

#### Color keywords

Named colors implementation follows the [CSS3/SVG specification](https://www.w3.org/TR/css-color-3/#svg-color):

<!-- alex ignore black white -->

- <ins style="background: #f0f8ff" class="color-box"></ins> aliceblue (`#f0f8ff`)
- <ins style="background: #faebd7" class="color-box"></ins> antiquewhite (`#faebd7`)
- <ins style="background: #00ffff" class="color-box"></ins> aqua (`#00ffff`)
- <ins style="background: #7fffd4" class="color-box"></ins> aquamarine (`#7fffd4`)
- <ins style="background: #f0ffff" class="color-box"></ins> azure (`#f0ffff`)
- <ins style="background: #f5f5dc" class="color-box"></ins> beige (`#f5f5dc`)
- <ins style="background: #ffe4c4" class="color-box"></ins> bisque (`#ffe4c4`)
- <ins style="background: #000000" class="color-box"></ins> black (`#000000`)
- <ins style="background: #ffebcd" class="color-box"></ins> blanchedalmond (`#ffebcd`)
- <ins style="background: #0000ff" class="color-box"></ins> blue (`#0000ff`)
- <ins style="background: #8a2be2" class="color-box"></ins> blueviolet (`#8a2be2`)
- <ins style="background: #a52a2a" class="color-box"></ins> brown (`#a52a2a`)
- <ins style="background: #deb887" class="color-box"></ins> burlywood (`#deb887`)
- <ins style="background: #5f9ea0" class="color-box"></ins> cadetblue (`#5f9ea0`)
- <ins style="background: #7fff00" class="color-box"></ins> chartreuse (`#7fff00`)
- <ins style="background: #d2691e" class="color-box"></ins> chocolate (`#d2691e`)
- <ins style="background: #ff7f50" class="color-box"></ins> coral (`#ff7f50`)
- <ins style="background: #6495ed" class="color-box"></ins> cornflowerblue (`#6495ed`)
- <ins style="background: #fff8dc" class="color-box"></ins> cornsilk (`#fff8dc`)
- <ins style="background: #dc143c" class="color-box"></ins> crimson (`#dc143c`)
- <ins style="background: #00ffff" class="color-box"></ins> cyan (`#00ffff`)
- <ins style="background: #00008b" class="color-box"></ins> darkblue (`#00008b`)
- <ins style="background: #008b8b" class="color-box"></ins> darkcyan (`#008b8b`)
- <ins style="background: #b8860b" class="color-box"></ins> darkgoldenrod (`#b8860b`)
- <ins style="background: #a9a9a9" class="color-box"></ins> darkgray (`#a9a9a9`)
- <ins style="background: #006400" class="color-box"></ins> darkgreen (`#006400`)
- <ins style="background: #a9a9a9" class="color-box"></ins> darkgrey (`#a9a9a9`)
- <ins style="background: #bdb76b" class="color-box"></ins> darkkhaki (`#bdb76b`)
- <ins style="background: #8b008b" class="color-box"></ins> darkmagenta (`#8b008b`)
- <ins style="background: #556b2f" class="color-box"></ins> darkolivegreen (`#556b2f`)
- <ins style="background: #ff8c00" class="color-box"></ins> darkorange (`#ff8c00`)
- <ins style="background: #9932cc" class="color-box"></ins> darkorchid (`#9932cc`)
- <ins style="background: #8b0000" class="color-box"></ins> darkred (`#8b0000`)
- <ins style="background: #e9967a" class="color-box"></ins> darksalmon (`#e9967a`)
- <ins style="background: #8fbc8f" class="color-box"></ins> darkseagreen (`#8fbc8f`)
- <ins style="background: #483d8b" class="color-box"></ins> darkslateblue (`#483d8b`)
- <ins style="background: #2f4f4f" class="color-box"></ins> darkslategrey (`#2f4f4f`)
- <ins style="background: #00ced1" class="color-box"></ins> darkturquoise (`#00ced1`)
- <ins style="background: #9400d3" class="color-box"></ins> darkviolet (`#9400d3`)
- <ins style="background: #ff1493" class="color-box"></ins> deeppink (`#ff1493`)
- <ins style="background: #00bfff" class="color-box"></ins> deepskyblue (`#00bfff`)
- <ins style="background: #696969" class="color-box"></ins> dimgray (`#696969`)
- <ins style="background: #696969" class="color-box"></ins> dimgrey (`#696969`)
- <ins style="background: #1e90ff" class="color-box"></ins> dodgerblue (`#1e90ff`)
- <ins style="background: #b22222" class="color-box"></ins> firebrick (`#b22222`)
- <ins style="background: #fffaf0" class="color-box"></ins> floralwhite (`#fffaf0`)
- <ins style="background: #228b22" class="color-box"></ins> forestgreen (`#228b22`)
- <ins style="background: #ff00ff" class="color-box"></ins> fuchsia (`#ff00ff`)
- <ins style="background: #dcdcdc" class="color-box"></ins> gainsboro (`#dcdcdc`)
- <ins style="background: #f8f8ff" class="color-box"></ins> ghostwhite (`#f8f8ff`)
- <ins style="background: #ffd700" class="color-box"></ins> gold (`#ffd700`)
- <ins style="background: #daa520" class="color-box"></ins> goldenrod (`#daa520`)
- <ins style="background: #808080" class="color-box"></ins> gray (`#808080`)
- <ins style="background: #008000" class="color-box"></ins> green (`#008000`)
- <ins style="background: #adff2f" class="color-box"></ins> greenyellow (`#adff2f`)
- <ins style="background: #808080" class="color-box"></ins> grey (`#808080`)
- <ins style="background: #f0fff0" class="color-box"></ins> honeydew (`#f0fff0`)
- <ins style="background: #ff69b4" class="color-box"></ins> hotpink (`#ff69b4`)
- <ins style="background: #cd5c5c" class="color-box"></ins> indianred (`#cd5c5c`)
- <ins style="background: #4b0082" class="color-box"></ins> indigo (`#4b0082`)
- <ins style="background: #fffff0" class="color-box"></ins> ivory (`#fffff0`)
- <ins style="background: #f0e68c" class="color-box"></ins> khaki (`#f0e68c`)
- <ins style="background: #e6e6fa" class="color-box"></ins> lavender (`#e6e6fa`)
- <ins style="background: #fff0f5" class="color-box"></ins> lavenderblush (`#fff0f5`)
- <ins style="background: #7cfc00" class="color-box"></ins> lawngreen (`#7cfc00`)
- <ins style="background: #fffacd" class="color-box"></ins> lemonchiffon (`#fffacd`)
- <ins style="background: #add8e6" class="color-box"></ins> lightblue (`#add8e6`)
- <ins style="background: #f08080" class="color-box"></ins> lightcoral (`#f08080`)
- <ins style="background: #e0ffff" class="color-box"></ins> lightcyan (`#e0ffff`)
- <ins style="background: #fafad2" class="color-box"></ins> lightgoldenrodyellow (`#fafad2`)
- <ins style="background: #d3d3d3" class="color-box"></ins> lightgray (`#d3d3d3`)
- <ins style="background: #90ee90" class="color-box"></ins> lightgreen (`#90ee90`)
- <ins style="background: #d3d3d3" class="color-box"></ins> lightgrey (`#d3d3d3`)
- <ins style="background: #ffb6c1" class="color-box"></ins> lightpink (`#ffb6c1`)
- <ins style="background: #ffa07a" class="color-box"></ins> lightsalmon (`#ffa07a`)
- <ins style="background: #20b2aa" class="color-box"></ins> lightseagreen (`#20b2aa`)
- <ins style="background: #87cefa" class="color-box"></ins> lightskyblue (`#87cefa`)
- <ins style="background: #778899" class="color-box"></ins> lightslategrey (`#778899`)
- <ins style="background: #b0c4de" class="color-box"></ins> lightsteelblue (`#b0c4de`)
- <ins style="background: #ffffe0" class="color-box"></ins> lightyellow (`#ffffe0`)
- <ins style="background: #00ff00" class="color-box"></ins> lime (`#00ff00`)
- <ins style="background: #32cd32" class="color-box"></ins> limegreen (`#32cd32`)
- <ins style="background: #faf0e6" class="color-box"></ins> linen (`#faf0e6`)
- <ins style="background: #ff00ff" class="color-box"></ins> magenta (`#ff00ff`)
- <ins style="background: #800000" class="color-box"></ins> maroon (`#800000`)
- <ins style="background: #66cdaa" class="color-box"></ins> mediumaquamarine (`#66cdaa`)
- <ins style="background: #0000cd" class="color-box"></ins> mediumblue (`#0000cd`)
- <ins style="background: #ba55d3" class="color-box"></ins> mediumorchid (`#ba55d3`)
- <ins style="background: #9370db" class="color-box"></ins> mediumpurple (`#9370db`)
- <ins style="background: #3cb371" class="color-box"></ins> mediumseagreen (`#3cb371`)
- <ins style="background: #7b68ee" class="color-box"></ins> mediumslateblue (`#7b68ee`)
- <ins style="background: #00fa9a" class="color-box"></ins> mediumspringgreen (`#00fa9a`)
- <ins style="background: #48d1cc" class="color-box"></ins> mediumturquoise (`#48d1cc`)
- <ins style="background: #c71585" class="color-box"></ins> mediumvioletred (`#c71585`)
- <ins style="background: #191970" class="color-box"></ins> midnightblue (`#191970`)
- <ins style="background: #f5fffa" class="color-box"></ins> mintcream (`#f5fffa`)
- <ins style="background: #ffe4e1" class="color-box"></ins> mistyrose (`#ffe4e1`)
- <ins style="background: #ffe4b5" class="color-box"></ins> moccasin (`#ffe4b5`)
- <ins style="background: #ffdead" class="color-box"></ins> navajowhite (`#ffdead`)
- <ins style="background: #000080" class="color-box"></ins> navy (`#000080`)
- <ins style="background: #fdf5e6" class="color-box"></ins> oldlace (`#fdf5e6`)
- <ins style="background: #808000" class="color-box"></ins> olive (`#808000`)
- <ins style="background: #6b8e23" class="color-box"></ins> olivedrab (`#6b8e23`)
- <ins style="background: #ffa500" class="color-box"></ins> orange (`#ffa500`)
- <ins style="background: #ff4500" class="color-box"></ins> orangered (`#ff4500`)
- <ins style="background: #da70d6" class="color-box"></ins> orchid (`#da70d6`)
- <ins style="background: #eee8aa" class="color-box"></ins> palegoldenrod (`#eee8aa`)
- <ins style="background: #98fb98" class="color-box"></ins> palegreen (`#98fb98`)
- <ins style="background: #afeeee" class="color-box"></ins> paleturquoise (`#afeeee`)
- <ins style="background: #db7093" class="color-box"></ins> palevioletred (`#db7093`)
- <ins style="background: #ffefd5" class="color-box"></ins> papayawhip (`#ffefd5`)
- <ins style="background: #ffdab9" class="color-box"></ins> peachpuff (`#ffdab9`)
- <ins style="background: #cd853f" class="color-box"></ins> peru (`#cd853f`)
- <ins style="background: #ffc0cb" class="color-box"></ins> pink (`#ffc0cb`)
- <ins style="background: #dda0dd" class="color-box"></ins> plum (`#dda0dd`)
- <ins style="background: #b0e0e6" class="color-box"></ins> powderblue (`#b0e0e6`)
- <ins style="background: #800080" class="color-box"></ins> purple (`#800080`)
- <ins style="background: #663399" class="color-box"></ins> rebeccapurple (`#663399`)
- <ins style="background: #ff0000" class="color-box"></ins> red (`#ff0000`)
- <ins style="background: #bc8f8f" class="color-box"></ins> rosybrown (`#bc8f8f`)
- <ins style="background: #4169e1" class="color-box"></ins> royalblue (`#4169e1`)
- <ins style="background: #8b4513" class="color-box"></ins> saddlebrown (`#8b4513`)
- <ins style="background: #fa8072" class="color-box"></ins> salmon (`#fa8072`)
- <ins style="background: #f4a460" class="color-box"></ins> sandybrown (`#f4a460`)
- <ins style="background: #2e8b57" class="color-box"></ins> seagreen (`#2e8b57`)
- <ins style="background: #fff5ee" class="color-box"></ins> seashell (`#fff5ee`)
- <ins style="background: #a0522d" class="color-box"></ins> sienna (`#a0522d`)
- <ins style="background: #c0c0c0" class="color-box"></ins> silver (`#c0c0c0`)
- <ins style="background: #87ceeb" class="color-box"></ins> skyblue (`#87ceeb`)
- <ins style="background: #6a5acd" class="color-box"></ins> slateblue (`#6a5acd`)
- <ins style="background: #708090" class="color-box"></ins> slategray (`#708090`)
- <ins style="background: #fffafa" class="color-box"></ins> snow (`#fffafa`)
- <ins style="background: #00ff7f" class="color-box"></ins> springgreen (`#00ff7f`)
- <ins style="background: #4682b4" class="color-box"></ins> steelblue (`#4682b4`)
- <ins style="background: #d2b48c" class="color-box"></ins> tan (`#d2b48c`)
- <ins style="background: #008080" class="color-box"></ins> teal (`#008080`)
- <ins style="background: #d8bfd8" class="color-box"></ins> thistle (`#d8bfd8`)
- <ins style="background: #ff6347" class="color-box"></ins> tomato (`#ff6347`)
- <ins style="background: #40e0d0" class="color-box"></ins> turquoise (`#40e0d0`)
- <ins style="background: #ee82ee" class="color-box"></ins> violet (`#ee82ee`)
- <ins style="background: #f5deb3" class="color-box"></ins> wheat (`#f5deb3`)
- <ins style="background: #ffffff" class="color-box"></ins> white (`#ffffff`)
- <ins style="background: #f5f5f5" class="color-box"></ins> whitesmoke (`#f5f5f5`)
- <ins style="background: #ffff00" class="color-box"></ins> yellow (`#ffff00`)
- <ins style="background: #9acd32" class="color-box"></ins> yellowgreen (`#9acd32`)
