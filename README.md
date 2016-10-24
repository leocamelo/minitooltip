# minitooltip
A minimalist tooltip solution, perfect for fast and beautiful websites

- **Lightweight** - Around 3KB in minified version
- **Independent** - Don't require jQuery or any other library
- **Simplest** - Call minitooltip and done! You got tooltips

## Installing

### npm
```bash
$ npm install minitooltip --save
```

### Bower
```bash
$ bower install minitooltip --save
```

### manual
```html
<script src="path/to/minitooltip.min.js"></script>
```

## Getting Started

### The simplest way
Put the 'minitooltip' class on your body tag, and all title attributes will be transformed into tooltips
```html
<body class="minitooltip">
  <h1 title="A tooltip here">Very simple!</h1>
</body>
```

### Setup with classes
All elements with 'tip' class and title attribute will receive tooltips
```html
<h1 class="tip" title="I'm a tooltip!">Another simple way</h1>
<h2 class="tip tip-down" title="YES!">A tooltip with arbitrary position</h2>
```

### Setup with data-attributes
If you want, it is also possible to work with data-attributes
```html
<ul>
  <li data-tip="HEY">A tooltip without title</li>
  <li data-tip="HO" data-tip-position="down">Another arbitrary position</li>
</ul>
```

## Styling

### Setting the global theme
The default global theme is Dark, but you can change it adding the 'minitooltip-light' class on your body tag
```html
<body class="minitooltip-light">
  <h1 data-tip="A dark website">With a light tooltip</h1>
</body>
```

### Setting a single tooltip theme
You can set the theme of a single tooltip with the classes 'tip-dark' and 'tip-light'. And, if you prefer, can define this with data attributes
```html
<h1 class="tip tip-dark" title="A dark tip here">foo</h1>
<h2 data-tip="A light tip here" data-tip-theme="light">bar</h2>
```

### Hacking the themes
The minitooltip themes is just css, and you can override his styles with more css
```css
#tip{ background: red !important; }
#tip[data-tip-position=up]:after{ border-top-color: red !important; }
#tip[data-tip-position=down]:after{ border-bottom-color: red !important; }
```

## Contributing
Like the library? Feel free to contribute! Make your fork, submit your pull request and help to grow it

## License
minitooltip is freely distributable under the [MIT license](https://github.com/leonardocamelo/minitooltip/blob/master/LICENSE)
