import util from './util';
import SVG from 'svg.js';

export default () => {
  SVG.CircularArc = SVG.invent({
    // fill = line or full, mode = half or full
    create: function(config) {
      // To Do...make sure min < max, initial is <= max and >= min
      this.max = config.max;
      this.min = config.min;
      //this.setting = config.setting;
      this.step = config.step;
      this.radius = config.radius;
      this.fill = config.fill;
      this.mode = config.mode;
      this.lineColor = config.lineColor;
      this.lineWidth = config.lineWidth;
      this.fullColor = config.fullColor;
      this.setting(config.setting);
  
      this.startAngle = 0;
      if (this.mode === 'half')
        this.startAngle = -90.0;
      if (this.fill === 'line') {
        this.attr('fill', '#000');
        this.attr('fill-opacity', 0);
        this.attr('stroke', this.lineColor);
        this.attr('stroke-width', this.lineWidth);
      }
    },
    
    inherit: SVG.Path,
  
    extend: {
      setting: function(value) {
        return this.attr('setting', value)
      },

      plot: function (d) {
        if (d == null) {
          var x     = this.attr('x') + this.radius + this.lineWidth;
          var y     = this.attr('y') + this.radius + this.lineWidth;
          var start = util.polarToCartesian(x, y, this.radius, this.angle());
          var end   = util.polarToCartesian(x, y, this.radius, this.startAngle);
  
          var largeArcFlag = this.angle() - this.startAngle <= 180 ? "0" : "1";
  
          d = [
              "M", start.x, start.y, 
              "A", this.radius, this.radius, 0, largeArcFlag, 0, end.x, end.y
          ].join(" ");
        }
  
        return this.clear().attr('d', typeof d == 'string' ? d : (this._array = new SVG.PathArray(d)))
      },
  
      angle: function () {
        var max = this.max;
        var min = this.min;
        var normal = (this.attr('setting') - min) / (max - min);
        //var denomral = (normal * (max - min) + min);
        return (180 * normal) - 90
      }
    },
    
    construct: {
      CircularArc: function(config) {
        // TO DO...pass onValChange event to the constructor as well
        return this.put(new SVG.CircularArc(config)).plot();
      }
    }
  })
};