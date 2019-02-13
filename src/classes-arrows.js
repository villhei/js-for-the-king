/* Classes and different ways to BIND */

// The problem

function LegacyCounter() {
	this.count = 0
}

LegacyCounter.prototype.cycle = function () {
	this.count++
	return this.count
}

// Everything is fine
const legacyCounter = new LegacyCounter()
console.log(legacyCounter.cycle())

// Until we call the function in a unsuspected context
console.log(legacyCounter.cycle.call(this))

// It's all about the call being bound to a wrong object
console.log(LegacyCounter.prototype.cycle.call(this))

// Because state is actually external to JavaScript functions
// Funny, huh? :D

console.log(LegacyCounter.prototype.cycle.call({ count: 1 }))

// The ES6-style class is just syntactic sugar to the legacy class

class Counter {
    constructor() {
        this.count = 0
    }
    cycle() {
        this.count++
        return this.count
    }
}

const stupidCounter = new Counter()

console.log(stupidCounter)
console.log(stupidCounter.cycle.call(this))

// Let's simulate the react-y situation
// where the context is unexpected

class IncrementingCounter extends Counter {
    increment() {
        this.count++
    }

    cycle() {
        this.increment()
        return this.count
    }
}

const iCounter = new IncrementingCounter()

try {
    console.log(iCounter.cycle())
    console.log(iCounter.cycle.call(this))
} catch (e) {
    console.log(e)
}

// The class methods are typically bound to allow "this" access

// Verbose ceremony! Low level calls! Yuck!

class TraditionalCounter extends Counter {
    constructor() {
        super()
        this.cycle = this.cycle.bind(this)
    }

    increment() {
        this.count++
    }

    cycle() {
        this.increment()
        return this.count
    }
}

const tCounter = new TraditionalCounter()

console.log(tCounter.cycle())
console.log(tCounter.cycle.call(this))

// Keep things brief!

// Enter the class-property syntax for functions!
// Provided by stage3 proposal: @babel/plugin-proposal-class-properties

class SimpleCounter extends Counter {
    increment = () => {
        this.count++
    }
    cycle = () => {
        this.increment()
        return this.count
    }
}

const sCounter = new SimpleCounter()

console.log(sCounter.cycle())
console.log(sCounter.cycle.call(this))

// The class property syntax brings ease to
// instance properties such as state and to
// static properties such as factories

class StatefulCounter {
    static create = () => new StatefulCounter()
    state = {
        count: 0
    }
    cycle = () => {
        this.state.count++
        return this.state.count
    }
}

const stateful = StatefulCounter.create()

console.log(stateful.cycle())
console.log(stateful.cycle.call(this))

// And then some comic relief
// ES6 funkiness

const ES6Factory = {
    create: () => ({
        count: 0,
        cycle() {
            this.count++
            return this.count
        }
    })
}

const es6Counter = ES6Factory.create()
console.log(es6Counter.cycle())
console.log(es6Counter.cycle())
