

function collectGroup1 (regExp, str) {
  let results = []
  for (const match of str.matchAll(regExp)) {
    results.push(match[1])
  }
  return results
}
console.log(collectGroup1(/"([^"]*)"/g, `"foo" and "bar" and "baz"`))
// ["foo", "bar", "baz"]