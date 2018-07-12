---
id: version-0.42-drawerlayoutandroid
title: DrawerLayoutAndroid
original_id: drawerlayoutandroid
---

封装了平台`DrawerLayout`（仅限安卓平台）的React组件。抽屉（通常用于导航切换）是通过`renderNavigationView`方法渲染的，并且DrawerLayoutAndroid的直接子视图会成为主视图（用于放置你的内容）。导航视图一开始在屏幕上并不可见，不过可以从`drawerPosition`指定的窗口侧面拖拽出来，并且抽屉的宽度可以使用`drawerWidth`属性来指定。

### 截图
![](img/components/drawerlayoutandroid.png)

### 例子

```javascript
render: function() {
  var navigationView = (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <Text style={{margin: 10, fontSize: 15, textAlign: 'left'}}>I'm in the Drawer!</Text>
    </View>
  );
  return (
    <DrawerLayoutAndroid
      drawerWidth={300}
      drawerPosition={DrawerLayoutAndroid.positions.Left}
      renderNavigationView={() => navigationView}>
      <View style={{flex: 1, alignItems: 'center'}}>
        <Text style={{margin: 10, fontSize: 15, textAlign: 'right'}}>Hello</Text>
        <Text style={{margin: 10, fontSize: 15, textAlign: 'right'}}>World!</Text>
      </View>
    </DrawerLayoutAndroid>
  );
},
```

### 属性

<div class="props">
	<div class="prop">
	    <h4 class="propTitle"><a class="anchor" name="drawerlockmode"></a>drawerLockMode <span
	        class="propType">enum('unlocked', 'locked-closed', 'locked-open')</span> 
	        <a class="hash-link" href="#drawerlockmode">#</a>
	    </h4>
	    <div>
	        <p>设置抽屉的锁定模式。有三种状态：
			<ul>
	        <li><code>unlocked</code> (默认值)，意味着此时抽屉可以响应打开和关闭的手势操作。
	        <li><code>locked-closed</code>，意味着此时抽屉将保持关闭，不可用手势打开。
	        <li><code>locked-open</code>，意味着此时抽屉将保持打开，不可用手势关闭。
	        </ul>
	        无论抽屉处于那种状态，都仍然可以调用<code>openDrawer</code>/<code>closeDrawer</code>这两个方法打开和关闭。
	        </p>
	    </div>
	</div>
    <div class="prop">
        <h4 class="propTitle"><a class="anchor" name="view"></a><a href="view.html#props">View props...</a> <a class="hash-link" href="#view">#</a></h4>
    </div>
    <div class="prop">
        <h4 class="propTitle"><a class="anchor" name="drawerposition"></a>drawerPosition <span class="propType">enum(DrawerConsts.DrawerPosition.Left, DrawerConsts.DrawerPosition.Right)</span> <a class="hash-link" href="#drawerposition">#</a></h4>
        <div>
            <p>指定抽屉可以从屏幕的哪一边滑入。</p>
        </div>
    </div>
    <div class="prop">
        <h4 class="propTitle"><a class="anchor" name="drawerwidth"></a>drawerWidth <span class="propType">number</span> <a class="hash-link" href="#drawerwidth">#</a></h4>
        <div>
            <p>指定抽屉的宽度，也就是从屏幕边缘拖进的视图的宽度。</p>
        </div>
    </div>
    <div class="prop">
        <h4 class="propTitle"><a class="anchor" name="keyboarddismissmode"></a>keyboardDismissMode <span class="propType">enum('none', "on-drag")</span> <a class="hash-link" href="#keyboarddismissmode">#</a></h4>
        <div>
            <p>指定在拖拽的过程中是否要隐藏软键盘。</p>
            <ul>
            <li><p><code>none</code> (默认值)，拖拽不会隐藏软键盘。</p></li>
            <li><p><code>on-drag</code> 当拖拽开始的时候隐藏软键盘。</p></li>
            </ul>
        </div>
    </div>
    <div class="prop">
        <h4 class="propTitle"><a class="anchor" name="ondrawerclose"></a>onDrawerClose <span class="propType">function</span> <a class="hash-link" href="#ondrawerclose">#</a></h4>
        <div>
            <p>每当导航视图（抽屉）被关闭之后调用此回调函数。</p>
        </div>
    </div>
    <div class="prop">
        <h4 class="propTitle"><a class="anchor" name="ondraweropen"></a>onDrawerOpen <span class="propType">function</span> <a class="hash-link" href="#ondraweropen">#</a></h4>
        <div>
            <p>每当导航视图（抽屉）被打开之后调用此回调函数。</p>
        </div>
    </div>
    <div class="prop">
        <h4 class="propTitle"><a class="anchor" name="ondrawerslide"></a>onDrawerSlide <span class="propType">function</span> <a class="hash-link" href="#ondrawerslide">#</a></h4>
        <div>
            <p>每当导航视图（抽屉）产生交互的时候调用此回调函数。</p>
        </div>
    </div>
    <div class="prop">
        <h4 class="propTitle"><a class="anchor" name="ondrawerstatechanged"></a>onDrawerStateChanged <span class="propType">function</span> <a class="hash-link" href="#ondrawerstatechanged">#</a></h4>
        <div>
            <p>每当抽屉的状态变化时调用此回调函数。抽屉可以有3种状态：</p>
            <ul>
            <li><p><code>idle</code>（空闲），表示现在导航条上没有任何正在进行的交互。</p></li>
            <li><p><code>dragging</code>（拖拽中），表示用户正在与导航条进行交互。</p></li>
            <li><p><code>settling</code>（停靠中），表示用户刚刚结束与导航条的交互，导航条正在结束打开或者关闭的动画。</p></li>
            </ul>
        </div>
    </div>
    <div class="prop">
        <h4 class="propTitle"><a class="anchor" name="rendernavigationview"></a>renderNavigationView <span class="propType">function</span> <a class="hash-link" href="#rendernavigationview">#</a></h4>
        <div>
            <p>此方法用于渲染一个可以从屏幕一边拖入的导航视图。</p>
        </div>
    </div>
</div>
