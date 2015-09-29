# minitooltip
*v0.1.2*
A minimalist tooltip solution, perfect for fast and beautiful websites

- **Lightweight** - Only 1.6kb in minified version
- **Independent** - Don't require jQuery or any other library
- **Simplest** - Call minitooltip and done! You got tooltips

## Installing

### Bower
```bash
$ bower install minitooltip --save
```

### npm
```bash
$ npm install minitooltip --save
```

### manual
```html
<script src="path/to/minitooltip.min.js"></script>
```

## Getting Started

### The simplest way
Put the 'minitooltip' class in your body tag, and all titles attributes will be transformed into tooltips
```html
<body class="minitooltip">
  <h1 title="A tooltip here">Very simple!</h1>
</body>
```

### Setup with classes
All elements with 'tip' class with title attribute will receive tooltips
```html
<h1 class="tip" title="I'm a tooltip!">Another simple way</h1>
```

### Setup with data-attributes
If you want, it is possible to work with data-attributes to get more options
```html
<ul>
  <li data-tip="HEY">A tooltip without title</li>
  <li data-tip="HO" data-tip-position="down">A tooltip with arbitrary position</li>
</ul>
```

## Contributing
Like the library? Feel free to contribute! Make your fork, submit your pull request and help to grow it

## License
minitooltip is freely distributable under the [MIT license](https://github.com/leonardocamelo/minitooltip/blob/master/LICENSE)
