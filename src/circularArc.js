import util from './util';
import SVG from 'svg.js';

export default () => {
  SVG.CircularArc = SVG.invent({

    create: 'path',

    inherit: SVG.Path,

    extend: {
      init: function(config) {
        // To Do...make sure min < max, initial is <= max and >= min
        this.setting(config.setting);
        this.max(config.max);
        this.min(config.min);
        this.radius(config.radius);
        this.lineWidth(config.lineWidth);
        this.startAngle(-90.0);

        // default colors
        this.attr('fill', '#000');
        this.attr('fill-opacity', 0);
        this.attr('stroke', config.lineColor);
        this.attr('stroke-width', config.lineWidth);
        return this;
      },
      max: function(val) {
        return this.attr('max', val)
      },
      min: function(val) {
        return this.attr('min', val)
      },
      radius: function(val) {
        return this.attr('radius', val)
      },
      lineWidth: function(val) {
        return this.attr('lineWidth', val)
      },
      startAngle: function(val) {
        return this.attr('startAngle', val)
      },
      setting: function(val) {
        return this.attr('setting', val)
      },

      plot: function (d) {
        if (d == null) {
          var x     = this.attr('x') + this.attr('radius') + this.attr('lineWidth');
          var y     = this.attr('y') + this.attr('radius') + this.attr('lineWidth');
          var start = util.polarToCartesian(x, y, this.attr('radius'), this.angle());
          var end   = util.polarToCartesian(x, y, this.attr('radius'), this.attr('startAngle'));
  
          var largeArcFlag = this.angle() - this.attr('startAngle') <= 180 ? "0" : "1";
  
          d = [
              "M", start.x, start.y, 
              "A", this.attr('radius'), this.attr('radius'), 0, largeArcFlag, 0, end.x, end.y
          ].join(" ");
        }
  
        return this.clear().attr('d', typeof d == 'string' ? d : (this._array = new SVG.PathArray(d)))
      },
  
      angle: function () {
        //var denomral = (normal * (max - min) + min);
        var normal = (this.attr('setting') - this.attr('min')) / (this.attr('max') - this.attr('min'));
        return (180 * normal) - 90
      }
    },
  
    construct: {
      circulararc: function(config) {
        // TO DO...pass onValChange event to the constructor as well
        //return this.put(new SVG.CircularArc(config)).plot();
        return this.put(new SVG.CircularArc).init(config).plot();
      }
    }
  })
};