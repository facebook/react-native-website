---
id: version-0.51-listviewdatasource
title: ListView.DataSource
original_id: listviewdatasource
---

`ListViewDataSource`为`ListView`组件提供高性能的数据处理和访问。我们需要调用方法从原始输入数据中抽取数据来创建`ListViewDataSource`对象，并用其进行数据变更的比较。原始输入数据可以是简单的字符串数组，也可以是复杂嵌套的对象——分不同区(section)各自包含若干行(row)数据。

要更新datasource中的数据，请（每次都重新）调用`cloneWithRows`方法（如果用到了section，则对应`cloneWithRowsAndSections`方法）。数据源中的数据本身是不可修改的，所以请勿直接尝试修改。clone方法会自动提取新数据并进行逐行对比（使用rowHasChanged方法中的策略），这样ListView就知道哪些行需要重新渲染了。

在下面这个例子中，一个组件在分块接受数据，这些数据由`_onDataArrived`方法处理——将新数据拼接（concat）到旧数据尾部，同时使用clone方法更新DataSource。我们使用concat方法来修改`this._data`以创建新数组，注意不能使用push方法拼接数组。实现`_rowHasChanged`方法需要透彻了解行数据的结构，以便提供高效的比对策略。

```jsx
constructor(props) {
  super(props);
  var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
  this.state = {
    ds,
  };
  this._data = []; 
}

_onDataArrived = (newData) => {
  this._data = this._data.concat(newData);
  this.setState({
    ds: this.state.ds.cloneWithRows(this._data)
  });
};
```


### 方法
<div class="props">
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="constructor"></a>constructor<span class="propType">(params)</span>
        <a class="hash-link" href="#constructor">#</a></h4>
        <div><p>你可以在构造函数中针对section标题和行数据提供自定义的提取方法和<code>hasChanged</code>比对方法。如果不提供，则会使用默认的<code>defaultGetRowData</code>和<code>defaultGetSectionHeaderData</code>方法来提取行数据和section标题。</p>
            <p>默认的提取函数可以处理下列形式的数据:</p>
			<p><code>{ sectionID_1: { rowID_1: rowData1, ... }, ... }</code></p>
			<p>或者：</p>
			<p><code>{ sectionID_1: [ rowData1, rowData2, ... ], ... }</code></p>
			<p>或者：</p>
			<p><code>[ [ rowData1, rowData2, ... ], ... ]</code></p>
            <p>构造函数可以接受下列四种参数（都是可选）：</p>
            <ul>
                <li>getRowData(dataBlob, sectionID, rowID);</li>
                <li>getSectionHeaderData(dataBlob, sectionID);</li>
                <li>rowHasChanged(prevRowData, nextRowData);</li>
                <li>sectionHeaderHasChanged(prevSectionData, nextSectionData);</li>
            </ul>
        </div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="clonewithrows"></a>cloneWithRows<span
            class="propType">(dataBlob, rowIdentities)</span> <a class="hash-link"
                                                                 href="#clonewithrows">#</a>
    </h4>
        <div><p>根据指定的<code>dataBlob</code>和
            <code>rowIdentities</code>为<code>ListViewDataSource</code>复制填充数据。<code>dataBlob</code>即原始数据。需要在初始化时定义抽取函数（否则使用默认的抽取函数）。</p>
            <p><code>rowIdentities</code>是一个二维数组，包含了行数据对应的id标识符，例如[['a1', 'a2'], ['b1', 'b2', 'b3'], ...]。如果没有指定此数组，则默认取行数据的key。</p>
            <p>注：此方法<strong>实际并没有</strong>复制数据。它只是重新创建一个datasource，然后将你指定的dataBlob传递给构造函数中指定的提取函数，因而会抛弃先前的数据。如果你希望保留先前的数据，则必须先自行进行新老数据的合并处理，然后再将合并后的结果作为<code>dataBlob</code>传递给此方法调用。</p></div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="clonewithrowsandsections"></a>cloneWithRowsAndSections<span
            class="propType">(dataBlob, sectionIdentities, rowIdentities)</span> <a class="hash-link"
                                                                                    href="#clonewithrowsandsections">#</a>
    </h4>
        <div><p>此方法作用基本等同<code>cloneWithRows</code>，区别在于可以额外指定<code>sectionIdentities</code> 。如果你不需要section，则直接使用<code>cloneWithRows</code>即可。</p>
            <p><code>sectionIdentities</code>同理是包含了section标识符的数组。例如['s1', 's2', ...]。如果没有指定此数组，则默认取section的key。</p>
            <p>注：此方法会返回新的对象！</p></div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="getrowcount"></a>getRowCount<span class="propType">()</span>
        <a class="hash-link" href="#getrowcount">#</a></h4></div>
    <div class="prop"><h4 class="propTitle"><a class="anchor"
                                               name="getrowandsectioncount"></a>getRowAndSectionCount<span
            class="propType">()</span> <a class="hash-link"
                                          href="#getrowandsectioncount">#</a></h4></div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="rowshouldupdate"></a>rowShouldUpdate<span
            class="propType">(sectionIndex, rowIndex)</span> <a class="hash-link"
                                                                href="#rowshouldupdate">#</a>
    </h4>
        <div><p>返回值表明某行数据是否已变更，需要重新渲染。</p></div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="getrowdata"></a>getRowData<span class="propType">(sectionIndex, rowIndex)</span>
        <a class="hash-link" href="#getrowdata">#</a></h4>
        <div><p>返回渲染行所需的数据（指定如何从原始dataBlob中提取数据）。</p></div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="getrowidforflatindex"></a>getRowIDForFlatIndex<span
            class="propType">(index)</span> <a class="hash-link"
                                               href="#getrowidforflatindex">#</a></h4>
        <div><p>给定索引值，求其对应rowID。如果查找不到则返回null。</p></div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="getsectionidforflatindex"></a>getSectionIDForFlatIndex<span
            class="propType">(index)</span> <a class="hash-link"
                                               href="#getsectionidforflatindex">#</a></h4>
        <div><p>给定索引值，求其对应sectionID。如果查找不到则返回null。</div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="getsectionlengths"></a>getSectionLengths<span
            class="propType">()</span> <a class="hash-link" href="#getsectionlengths">#</a>
    </h4>
        <div><p>返回一个数组，包含每个section的行数量。</p></div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="sectionheadershouldupdate"></a>sectionHeaderShouldUpdate<span
            class="propType">(sectionIndex)</span> <a class="hash-link"
                                                      href="#sectionheadershouldupdate">#</a>
    </h4>
        <div><p>返回值用于说明section标题是否需要重新渲染。</p></div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="getsectionheaderdata"></a>getSectionHeaderData<span
            class="propType">(sectionIndex)</span> <a class="hash-link"
                                                      href="#getsectionheaderdata">#</a>
    </h4>
        <div><p>获取section标题数据。</p></div>
    </div>
</div>
