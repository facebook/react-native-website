---
id: splash-screen-android
title: Splash Screen
---

There are a few ways to do splash screens. This shows one of the simpler and more effective ways. We will set a background color on the splash, and also center an image. Optional notes on how to set status bar coloring while in the splash screen is also shown.

1. **Create a custom color** - We have to first create a color we can reference. In the `./android/app/src/main/res/values/` directory create a file called `colors.xml` and populate it with this contents:
  
    ```
    <?xml version="1.0" encoding="utf-8"?>
    <resources>
      <color name="foobar">#ca949b</color>
    </resources>
    ```
  
  You can use any hex in place of `#ca949b` and can name the color anything in place of `foobar`. For this guide we will be leaving it at this.
  
2. **Create layout file** - We now layout what our splash screen should look like. Create a directory in `./android/app/src/main/res/` called `drawable`. And inside it create a file called `splash_screen.xml`. (Final path of file is: `./android/app/src/main/res/drawable/splash_screen.xml`. Populate this file with the following contents:

    ```
    blah blah
    ```
