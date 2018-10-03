const assert = require('chai').assert

describe('SVG actually works', function () {
  it('should be able to draw', function () {
    const draw = window['draw']
    assert.exists(draw)

    var arc = draw.circulararc({
      min: -20,
      max: 20,
      setting: 0,
      step: 1,
      radius: 150,
      fill: 'line',
      mode: 'half',
      lineColor: 'red',
      lineWidth: 15
    }).move(10, 10)

    assert.exists(arc)
  })
})
