import util from './util'
import SVG from 'svg.js'

export default () => {
  SVG.CircularArc = SVG.invent({

    create: 'path',

    inherit: SVG.Path,

    extend: {
      init: function (config) {
        // To Do...make sure min < max, initial is <= max and >= min
        // The presentation of the arc is not designed to be changed after creation
        this.value = config.value
        this.max = config.max
        this.min = config.min
        this.radius = config.radius
        this.valueWidth = config.valueWidth
        this.startAngle = -90.0
        this.lastMove = { x: 0, y: 0 }

        // default colors
        this.attr('fill', '#000')
        this.attr('fill-opacity', 0)
        this.attr('stroke', config.valueColor)
        this.attr('stroke-width', config.valueWidth)
        return this
      },

      move: function (x, y) {
        this.lastMove = { x: x, y: y }

        // when less than 50% of radius, the arcs bbox shrinks in size so we need to shift the path back down the Y axis
        if (this.normalizedValue < 0.5) {
          y += this.radius - this.height()
        }
        return this.attr('d', this.array().move(x + this.valueWidth / 2, y + this.valueWidth / 2))
      },

      plot: function (d) {
        if (d == null) {
          let x = this.radius + this.valueWidth / 2
          let y = this.radius + this.valueWidth / 2

          let start = util.polarToCartesian(x, y, this.radius, this.angle())
          let end = util.polarToCartesian(x, y, this.radius, this.startAngle)
          let largeArcFlag = this.angle() - this.startAngle <= 180 ? '0' : '1'

          d = [
            'M', start.x, start.y,
            'A', this.radius, this.radius, 0, largeArcFlag, 0, end.x, end.y
          ].join(' ')
        }

        return this.clear().attr('d', typeof d === 'string' ? d : (this._array = new SVG.PathArray(d)))
      },

      angle: function () {
        this.normalizedValue = (this.value - this.min) / (this.max - this.min)
        return (180 * this.normalizedValue) - 90
      },

      update: function (newValaue, ratio = false) {
        if (ratio) {
          // denormalize
          newValaue = (newValaue * (this.max - this.min) + this.min)
        }
        this.value = util.clamp(newValaue, this.min, this.max)
        this.plot().move(this.lastMove.x, this.lastMove.y)
        this.fire('valueChanged', this.value)
        return this
      }
    },

    construct: {
      circularArc: function (config) {
        return this.put(new SVG.CircularArc()).init(config).plot()
      }
    }
  })
}
