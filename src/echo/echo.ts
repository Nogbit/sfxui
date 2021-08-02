import { Svg, Rect, extend, Container } from '@svgdotjs/svg.js'

// Works, but not ideal for TS
declare let fabric: any;

class Rounded extends Rect {
  // Create method to proportionally scale the rounded corners
  size(width: number, height: number) {
    return this.attr({
      width:  width
    , height: height
    , rx:     height / 5
    , ry:     height / 5
    })
  }
}

// Add a method to create a rounded rect
extend(Container,  {
  // Create a rounded element
  rounded: function(width, height) {
    return this.put(new Rounded()).size(width, height)
  }
});

export const echo = (text: string): string => {
  console.log('Calling from within the module', Svg);
  return text;
};

export const swallow = (text: string) => {
  console.log('swallow');
};
