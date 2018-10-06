const assert = require('chai').assert

describe('SVG actually works', function () {
  it('should be able to draw', function () {
    const draw = window['draw']
    assert.exists(draw)

    let rect = draw.rect(20, 20)
    assert.exists(rect)
  })
})
