const assert = require('chai').assert
let draw = null
let basicConfig = {
  min: -20,
  max: 20,
  value: 0,
  radius: 150,
  valueColor: 'red',
  valueWidth: 10
}

beforeEach(function () {
  draw = window['draw']
})

afterEach(function () {
  draw.clear()
})

// To Do
describe('CircularArc', function () {
  it('creates a basic arc', function () {
    let arc = draw.circularArc(basicConfig)
    assert.exists(arc)
  })

  it('has an event called on value change', function () {
    draw.circularArc(basicConfig).on('valueChanged', function (e) {
      assert.equal(this.value, 5)
    }).update(5)
  })

  it('can be moved', function () {
    let arc = draw.circularArc(basicConfig)
    let movX = 5
    let movY = 25
    arc.move(movX, movY)
    assert.approximately(arc.bbox().x, movX + basicConfig.lineWidth / 2, 0.5)
    assert.approximately(arc.bbox().y, movY + basicConfig.lineWidth / 2, 0.5)
  })

  it('provides its value', function () {
    let arc = draw.circularArc(basicConfig).update(50)
    assert.equal(arc.value, 50)
  })
})
