import SVG from 'svg.js'

export default () => {
  SVG.Dial = SVG.invent({

    create: 'g',

    inherit: SVG.G,

    extend: {
      init: function (config) {
        let elements = []
        this.valueTextUnit = config.valueTextUnit
        this.valueTextFont = config.valueTextFont

        // the arc that is always at max but used as a background
        let configBg = Object.assign({}, config)
        if (config.backgroundColor) {
          configBg.value = config.max
          configBg.valueColor = config.backgroundColor
          this.bgArc = (new SVG.CircularArc()).init(configBg).plot()
          elements.push(this.bgArc)
        }

        // the arc that represents the current value
        this.fgArc = (new SVG.CircularArc()).init(config).plot().on('valueChanged', function (e) {
          this.parent().updateTextValue(e.detail.toString())
        })
        elements.push(this.fgArc)

        // the text that shows the current value
        this.textValue = (new SVG.Text()).font(config.valueTextFont)
        this.updateTextValue(config.value.toString())
        elements.push(this.textValue)

        // the text label
        if (config.labelText) {
          this.textLabel = (new SVG.Text()).text(config.labelText).font(config.labelTextFont)
          this.textLabel.move(this.bgArc.bbox().cx, this.bgArc.bbox().y - this.textLabel.bbox().height - config.labelTextPadding)
          elements.push(this.textLabel)
        }

        // paths only register click events on the part that is not covered
        this.clickArc = (new SVG.CircularArc()).init(configBg).click(function (e) {
          let x = e.clientX - this.parent().x()
          this.parent().inputAt(x / this.width())
        }).attr('stroke-opacity', 0).plot()
        elements.push(this.clickArc)

        return elements
      },

      updateTextValue: function (value) {
        let str = value + this.valueTextUnit
        let center = { x: this.bgArc.bbox().cx, y: this.bgArc.bbox().cy }
        this.textValue.text(str).move(center.x, center.y)
      },
      
      inputAt: function (x) {
        this.fgArc.update(x, true)
        return this
      }
    },

    construct: {
      dial: function (config) {
        let g = this.put(new SVG.Dial())
        for (const ele of g.init(config)) {
          g.add(ele)
        }
        return g
      }
    }
  })
}
