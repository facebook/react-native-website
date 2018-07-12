---
id: version-0.43-imageeditor
title: ImageEditor
original_id: imageeditor
---

### 方法

<div class="props">
    <div class="prop"><h4 class="methodTitle"><a class="anchor" name="cropimage"></a><span
            class="methodType">static </span>cropImage<span class="methodType">(uri, cropData, success, failure)</span>
        <a class="hash-link" href="#cropimage">#</a></h4>
        <div><p>根据指定的URI参数剪裁对应的图片。如果URI指向一个远程图片，则首先会自动下载该图片。如果图片无法下载或读取，则调用failure回调函数。</p>
            <p>如果剪裁成功完成，则剪裁好的图片会被存放在<a href="imagestore.html">ImageStore</a>中，同时success回调函数中返回的URI参数会指向ImageStore中的此图片。请记得在完成处理逻辑后删除ImageStore中的图片。</p></div>
    </div>
</div>