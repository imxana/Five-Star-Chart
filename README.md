


# Introduction

![](https://raw.githubusercontent.com/imxana/Five-Star-Chart/master/demo.png)

A easy way to show model ability.

# Quick Start


```html
<div id="fsc"></div>
<script src="./src/fsc.js"><script>
```

```js
let fsc = new FSC({
    element: document.getElementById('fsc'),
    data: {'偷':4, '稳':2, '莽':3, '狗':4, '谐':5, '奶':3}
});
```

# Usage



## Options

```js
var fsc = new FSC({
    element: document.getElementById('fsc'),                          // Optional, player element
    size: { x: 300, y: 300 },                                         // Required, for canvas size
    scale: { font: 0.7, polygon: 0.5},                                // Optional, scale for layout
    font: "16px Arial",                                               // Optional, default: "16px Arial"
    border : false,                                                   // Optional, default: false
    color: {                                                          // optional, color
        line1: 'rgba(0,0,0,0.5)',
        line2:'rgba(0,0,0,1)',
        bg:'rgba(0,0,0,0.05)',
        cover: 'rgba(255,100,0,0.1)'
    },
    maxScore: 5,                                                      // Optional, max score, default: 5
    levelScore: 2,                                                    // Optional, the level for showing, default: 2
    data: { '偷':4, '稳':2, '莽':3, '狗':4, '谐':5, '奶':3 },           // Required, the data displayed
    separator: ': '                                                   // Optional, for the expression
});
```

# License

MIT