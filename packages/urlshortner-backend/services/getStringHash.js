module.exports = function getStringHash(url, seed = 0) {
  const possible = 'abcdefghijklmnopqrstuvwxyz'
  let hash = 0
  for (let i = 0; i < url.length; i++) {
    const character = url.charCodeAt(i)
    hash = (hash << 5) - hash + character
    hash = hash & hash // Convert to 32bit integer
  }

  if (hash < 0) hash = -hash
  hash = hash + seed

  const numString = [...hash.toString().padStart(10, '0')]
  let res = ''
  while (numString.length > 0) {
    const pair = Number.parseInt(
      numString.splice(0, 2).reduce((prev, next) => prev.toString() + next, '')
    )

    res += possible[pair % possible.length]
  }

  return res
}
