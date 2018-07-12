---
id: version-0.44-permissionsandroid
title: PermissionsAndroid
original_id: permissionsandroid
---

`PermissionsAndroid`可以访问Android M(也就是6.0)开始提供的权限模型。有一些权限写在`AndroidManifest.xml`就可以在安装时自动获得。但有一些“危险”的权限则需要弹出提示框供用户选择。本API即用于后一种情形。

在低于Android 6.0的设备上，权限只要写在`AndroidManifest.xml`里就会自动获得，此情形下`check`和`request` 方法将始终返回true。

如果用户之前拒绝过你的某项权限请求，那么系统会建议你显示一个为什么需要这个权限的“详细解释”（rationale参数）。如果用户之前拒绝过，那么当你再次申请的时候，弹出的就可能不是原先的申请信息，而是`rationale`参数里提供的进一步解释。

### 例子

```js
async function requestCameraPermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        'title': '申请摄像头权限',
        'message': '一个很牛逼的应用想借用你的摄像头，' +
                   '然后你就可以拍出酷炫的皂片啦。'
      }
    )
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("现在你获得摄像头权限了")
    } else {
      console.log("用户并不屌你")
    }
  } catch (err) {
    console.warn(err)
  }
}
```
### 方法

<div class="props">
    <div class="prop">
        <h4 class="methodTitle">
        <a class="anchor" name="constructor"></a>constructor
        <span class="methodType">()</span>
        <a class="hash-link" href="permissionsandroid.html#constructor">#</a>
        </h4>
    </div>
    <div class="prop">
        <h4 class="methodTitle"><a class="anchor" name="check"></a>check<span
            class="methodType">(permission)</span>
            <a class="hash-link" href="permissionsandroid.html#check">#</a>
        </h4>
        <div><p>返回一个promise，最终值为用户是否授权过的布尔值。</p></div>
    </div>
    <div class="prop">
        <h4 class="methodTitle"><a class="anchor" name="request"></a>request<span
            class="methodType">(permission, rationale?)</span>
        <a class="hash-link" href="permissionsandroid.html#request">#</a>
        </h4>
        <div><p>弹出提示框向用户请求某项权限。返回一个promise，最终值为用户是否同意了权限申请的布尔值。</p>
            <p>其中rationale参数是可选的，其结构为包含<code>title</code>和<code>message</code>)的对象。此方法会和系统协商，是弹出系统内置的权限申请对话框，还是显示rationale中的信息以向用户进行解释。具体原理请参阅android官方文档
                (<a href="https://developer.android.com/training/permissions/requesting.html#explain">https://developer.android.com/training/permissions/requesting.html#explain</a>)。</p></div>
    </div>
    <div class="prop">
	    <h4 class="methodTitle"><a class="anchor" name="requestmultiple"></a>requestMultiple<span class="methodType">(permissions)</span> 
	    <a class="hash-link" href="#requestmultiple">#</a></h4>
	    <div><p>在一个弹出框中向用户请求多个权限。返回值为一个object，key为各权限名称，对应值为用户授权与否。</p></div>
	</div>
</div>