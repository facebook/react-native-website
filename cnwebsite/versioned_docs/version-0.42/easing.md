---
id: version-0.42-easing
title: Easing
original_id: easing
---

This class implements common easing functions. The math is pretty obscure, but this cool website has nice visual illustrations of what they represent: <http://xaedes.de/dev/transitions/>

### 方法

<div class="props">
    <div class="prop"><h4 class="methodTitle"><a class="anchor" name="step0"></a><span class="methodType">static </span>step0<span
            class="methodType">(n)</span> <a class="hash-link" href="#step0">#</a></h4></div>
    <div class="prop"><h4 class="methodTitle"><a class="anchor" name="step1"></a><span class="methodType">static </span>step1<span
            class="methodType">(n)</span> <a class="hash-link" href="#step1">#</a></h4></div>
    <div class="prop"><h4 class="methodTitle"><a class="anchor" name="linear"></a><span
            class="methodType">static </span>linear<span class="methodType">(t)</span> <a class="hash-link"
                                                                                          href="#linear">#</a>
    </h4></div>
    <div class="prop"><h4 class="methodTitle"><a class="anchor" name="ease"></a><span class="methodType">static </span>ease<span
            class="methodType">(t)</span> <a class="hash-link" href="#ease">#</a></h4></div>
    <div class="prop"><h4 class="methodTitle"><a class="anchor" name="quad"></a><span class="methodType">static </span>quad<span
            class="methodType">(t)</span> <a class="hash-link" href="#quad">#</a></h4></div>
    <div class="prop"><h4 class="methodTitle"><a class="anchor" name="cubic"></a><span class="methodType">static </span>cubic<span
            class="methodType">(t)</span> <a class="hash-link" href="#cubic">#</a></h4></div>
    <div class="prop"><h4 class="methodTitle"><a class="anchor" name="poly"></a><span class="methodType">static </span>poly<span
            class="methodType">(n)</span> <a class="hash-link" href="#poly">#</a></h4></div>
    <div class="prop"><h4 class="methodTitle"><a class="anchor" name="sin"></a><span class="methodType">static </span>sin<span
            class="methodType">(t)</span> <a class="hash-link" href="#sin">#</a></h4></div>
    <div class="prop"><h4 class="methodTitle"><a class="anchor" name="circle"></a><span
            class="methodType">static </span>circle<span class="methodType">(t)</span> <a class="hash-link"
                                                                                          href="#circle">#</a>
    </h4></div>
    <div class="prop"><h4 class="methodTitle"><a class="anchor" name="exp"></a><span class="methodType">static </span>exp<span
            class="methodType">(t)</span> <a class="hash-link" href="#exp">#</a></h4></div>
    <div class="prop"><h4 class="methodTitle"><a class="anchor" name="elastic"></a><span
            class="methodType">static </span>elastic<span class="methodType">(bounciness)</span> <a class="hash-link"
                                                                                                    href="#elastic">#</a>
    </h4>
        <div><p>A simple elastic interaction, similar to a spring. Default bounciness
            is 1, which overshoots a little bit once. 0 bounciness doesn't overshoot
            at all, and bounciness of N &gt; 1 will overshoot about N times.</p>
            <p>Wolfram Plots:</p>
            <p><a href="http://tiny.cc/elastic_b_1">http://tiny.cc/elastic_b_1</a> (default bounciness = 1)
                <a href="http://tiny.cc/elastic_b_3">http://tiny.cc/elastic_b_3</a> (bounciness = 3)</p></div>
    </div>
    <div class="prop"><h4 class="methodTitle"><a class="anchor" name="back"></a><span class="methodType">static </span>back<span
            class="methodType">(s)</span> <a class="hash-link" href="#back">#</a></h4></div>
    <div class="prop"><h4 class="methodTitle"><a class="anchor" name="bounce"></a><span
            class="methodType">static </span>bounce<span class="methodType">(t)</span> <a class="hash-link"
                                                                                          href="#bounce">#</a>
    </h4></div>
    <div class="prop"><h4 class="methodTitle"><a class="anchor" name="bezier"></a><span
            class="methodType">static </span>bezier<span class="methodType">(x1, y1, x2, y2)</span> <a class="hash-link"
                                                                                                       href="#bezier">#</a>
    </h4></div>
    <div class="prop"><h4 class="methodTitle"><a class="anchor" name="in"></a><span
            class="methodType">static </span>in<span class="methodType">(easing)</span> <a class="hash-link"
                                                                                           href="#in">#</a>
    </h4></div>
    <div class="prop"><h4 class="methodTitle"><a class="anchor" name="out"></a><span class="methodType">static </span>out<span
            class="methodType">(easing)</span> <a class="hash-link" href="#out">#</a></h4>
        <div><p>Runs an easing function backwards.</p></div>
    </div>
    <div class="prop"><h4 class="methodTitle"><a class="anchor" name="inout"></a><span class="methodType">static </span>inOut<span
            class="methodType">(easing)</span> <a class="hash-link" href="#inout">#</a></h4>
        <div><p>Makes any easing function symmetrical.</p></div>
    </div>
</div>