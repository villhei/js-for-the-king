/* The SPREAD for Arrays */

// Expands (spreads) stuff to an array

const alphabet = ['a', 'b', 'c']

const numbers = [1, 2, 3, 4]

const newAlpha = [...alphabet]

console.log(newAlpha)

console.log([0, ...numbers])

console.log([...numbers, 4])

// Spreads to capture array values from the right, creating a new array

const [...aCopy] = alphabet

console.log(aCopy)

// Can spread selectively
const [head, ...tail] = numbers

console.log(head)
console.log(tail)

ja

// Can be implicit
const [...tailImplicit] = alphabet

console.log(tailImplicit)
// Spreads up to the count of elements in an array

const [first, second, ...rest] = [1, 2]

console.log(first, second, rest)

/* The SPREAD for Objects */

// Expands (spreads) stuff to an object

const a = {
  KeyA: 'Value A'
}

const b = {
  KeyB: 'Value B'
}

const both = {
  ...a,
  ...b
}

console.log(both)

// Easily expand an object

const expansion = {
  ...both,
  KeyC: 'Value C'
}

console.log(expansion)

// Objectify an array

const indexed = { ...alphabet }

console.log(indexed)

// Exclude keys from an object

const { KeyA, ...others } = expansion

console.log(others)

/* The SPREAD for Functions */

// Expands (spreads) stuff to an array

// Spreads to a function call

function joinThree(x, y, z) {
  return [x, y, z].join('-')
}

const formatABC = joinThree(...alphabet)
const format123 = joinThree(...numbers)

console.log(formatABC)
console.log(format123)

console.log(...alphabet)
console.log(...numbers)

// Can be used to capture variable argument counts

function joinMany(...args) {
  return args.join('-')
}

const formatMany = joinMany('alpha', 'beta', 'gamma', 'qxuux')
const formatManyN = joinMany(...numbers)

console.log(formatMany)
console.log(formatManyN)

// Selective strategies work in variable capturing too

function joinBy(pattern, ...args) {
  return args.join(pattern)
}

const formatStar = joinBy(' * ', ...alphabet)
console.log(formatStar)

const formatFunny = joinBy(...alphabet, ...numbers)
console.log(formatFunny)

/* Fun alert!!!1 The SPREAD for strings */

// Strings spread to char arrays

const hello = 'Hello'
const world = 'World'
const example = [...hello]

console.log(example)

const fullExample = [...hello, ...world]

console.log(fullExample)

const fullString = 'Why: '.concat(hello, ' ', world)

console.log(fullString)

// You can even use array functions for strings this way

const res = [...'ABCDEF'].filter(letter => letter < 'C').join('')

// Because why not?

const stupidRes = [...'overly complex']
  .filter(letter => letter !== ' ')
  .map(letter => letter.toUpperCase())
  .join('_')

console.log(stupidRes)

// Strings also can be captured from the left

const [firstLetter, ...restOfWord] = hello

console.log(firstLetter)

console.log(restOfWord.join(''))
