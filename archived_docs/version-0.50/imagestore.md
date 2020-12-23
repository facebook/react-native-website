---
id: version-0.50-imagestore
title: ImageStore
original_id: imagestore
---

### 属性

<div class="props">
    <div class="prop">
        <h4 class="methodTitle"><a class="anchor" name="hasimagefortag"></a><span class="methodType">static </span>hasImageForTag<span
            class="methodType">(uri, callback)</span> <a class="hash-link"
                                                         href="#hasimagefortag">#</a></h4>
        <div><p>检查ImageStore中是否包含了指定URI的图片数据。目前仅限iOS。</p></div>
    </div>
    <div class="prop">
        <h4 class="methodTitle"><a class="anchor" name="removeimagefortag"></a><span class="methodType">static </span>removeImageForTag<span
            class="methodType">(uri)</span> <a class="hash-link" href="#removeimagefortag">#</a></h4>
        <div><p>从ImageStore中删除指定图片。存储在ImageStore中的图标必须手动删除，否则在应用退出之前将会一直占用内存。调用此删除方法并不需要先调用<code>hasImageForTag()</code>方法来检查，此方法会自动处理异常情况。目前仅限iOS。</p></div>
    </div>
    <div class="prop">
        <h4 class="methodTitle"><a class="anchor" name="addimagefrombase64"></a><span class="methodType">static </span>addImageFromBase64<span
            class="methodType">(base64ImageData, success, failure)</span> 
            <a class="hash-link" href="#addimagefrombase64">#
            </a>
        </h4>
        <div><p>在ImageStore中以base64编码格式存储一幅图片，并返回一个URI以便访问或显示此图片。图片数据仅仅保存在内存中，在使用完毕后请调用<code>removeImageForTag()</code>方法来手动删除。</p>
            <p>注意在JS和原生代码间传递大量二进制数据是非常低效的，所以若非必要，请尽量少用此方法。目前仅限iOS。</p></div>
    </div>
    <div class="prop">
        <h4 class="methodTitle"><a class="anchor" name="getbase64fortag"></a><span class="methodType">static </span>getBase64ForTag<span
            class="methodType">(uri, success, failure)</span> 
            <a class="hash-link" href="#getbase64fortag">#</a>
        </h4>
        <div><p>将ImageStore中的指定URI图片以base64编码格式的数据返回。如果找不到指定的URI，则会调用failure回调函数。</p>
            <p>注意在JS和原生代码间传递大量二进制数据是非常低效的，所以若非必要，请尽量少用此方法。如果只是为了显示图片，可以直接把URI传递给<code>&lt;Image/&gt;</code>组件，并不需要额外取base64数据。</p></div>
        </div>
</div>

