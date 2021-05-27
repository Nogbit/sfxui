<p align="center">
  <img src="docs/logo.png?raw=true">
</p>

[![David Dependency Status](https://david-dm.org/nogbit/sfxui.svg)](https://david-dm.org/nogbit/sfxui) [![npm package](https://img.shields.io/npm/v/sfxui.svg)](https://www.npmjs.com/package/sfxui)

## Features/Goals

- User interface components designed to be used in HTML/SVG DAW's (Digital Audio Workstation)
- 100% SVG.js implementation, all components are extensions of SVG.js
- Interactive elements with events exposed so you can build any kind of DAW
- Prebuilt and customizable themes enable custom skinning of everything

## Getting Started

As of right now, SVG.JS comes with SFXUI and is not installed seperately (that will change eventually).

1. Install

```javascript
npm install sfxui
```

2. Since SFXUI extends SVG.js, some familariaty with [SVG.js is required](https://svgdotjs.github.io/docs/3.0/). Create an HTML document as you would with SVG.js and an element you can draw to.

```HTML
<!DOCTYPE html>
<html>
<head>
  <title>SVG.js</title>
</head>
<body>
  <div id="drawing"></div>
</body>
</html>
```

3. Create an SVG document

```javascript
var draw = SVG("drawing").size(300, 300);
```

4. Create SFXUI elements just as you would SVG.js elements. SFXUI elements are meant to be more robust than simple shapes so they will often need config objects.

```JavaScript
var arc2 = draw.circularArc({
    min: -10,
    max: 10,
    value: 10,
    radius: 100,
    lineColor: 'blue',
    lineWidth: 10
})
```

![CircularArc](docs/circulararc-full.png?raw=true "Title")

Circular Arc's can have a minimum and maximum value, the middle of those two numbers would represent a arc that is a quarter of a circle.  The image below represents a `value` that is 100% of the `max`.


## Documentation
Coming soon.

## To Do

- [ ] Dial (composite circular arc with text showing value)
- [ ] Envelope (simple multipoint curve editor)
- [ ] ADSR Envelope (attack, decay, sustain, release)
- [ ] Button (basic on/off state)
- [ ] Much more

## Why SFXUI?

Right now, you have no reason really, it's early days, go use NexusUI. NexusUI is a very robust direct SVG audio UI library, it does not however use SVG.JS. The goal is to provide the necessary library of DAW components that sit on top of SVG.JS so you can create the DAW itself with SVG.JS as well. This will enable a consistant UI layer to sit between your application code and something like Tone.JS (wrapper for Web Audio API).

## Contributing

Sure if you like, use the npm scripts to get going, `npm run dev` serves up a watched `html/dev/.html` which is actually `build/dist/sfxui.html`. There are of course integrated tests as well in `test/spec`. Much more to come here as this library grows more mature.
