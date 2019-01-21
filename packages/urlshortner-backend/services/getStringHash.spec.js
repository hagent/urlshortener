const getStringHash = require('./getStringHash')

describe('getStringHash', () => {
  it('should be the same hash for the same url', () => {
    expect(getStringHash('http://google.com')).toBe(
      getStringHash('http://google.com')
    )
  })

  it('should be the different hash for different seed', () => {
    expect(getStringHash('http://google.com', 1)).not.toBe(
      getStringHash('http://google.com', 2)
    )
  })

  it('length should be greater or equal to 5', () => {
    expect(getStringHash('http://google.com').length).toBeGreaterThanOrEqual(5)
    expect(getStringHash('http://ya.com').length).toBeGreaterThanOrEqual(5)
    expect(getStringHash('http://bing.com').length).toBeGreaterThanOrEqual(5)
    expect(getStringHash('http://yahoo.com').length).toBeGreaterThanOrEqual(5)
  })
})
