console.log("script working")

const Meat = "chicken"


console.log("Meat.__proto__: ", Meat.__proto__)

console.log("// at()")

console.log("Meat.at(2): ", Meat.at(2))

console.log("// charAt()")

console.log("Meat.charAt(): ", Meat.charAt(2))

///
//// Classes
///
class MenuItem {
  constructor(name, price) {
    this.name = name;
    this.price = price;

  }
  orderOne() {
    return `Hello. I'll have one ${this.name} please`;
  }

  getTax() {
    let tax = 0.1 * this.price;
    return tax;
  }


}


const latte = new MenuItem("latte", 4)

console.log(latte.orderOne())
console.log(latte.getTax())

///
//// extends
///

class CoffeeItem extends MenuItem {
  constructor(name, price) {
    super(name, price)
    this.sizes = ["8oz", "12oz", "16oz"]
    this.bean = "arabica"
  }
  askSize() {
    let sizesListed = ""
    for (let i = 0; i < this.sizes.length; i++) {
      if (i !== this.sizes.length - 1) {
        sizesListed += this.sizes[i] + ", "
      } else {
        sizesListed += "or "
        sizesListed += this.sizes[i]
      }
    }
    return `Would you like ${sizesListed}?`
  }
}




const pourOver = new CoffeeItem("pourOver", 3)

console.log(pourOver.askSize())


///
//// Closures
///
//
// Lexical Scope
function outerFunction() {
  let outervariable = "I'm outside!"
  function innerFunction() {
    console.log(outervariable)
  }
  innerFunction();
}

outerFunction()


// let pig = "oink"


function outerFunction() {
  // variables declared here cannot be mutated from outside the function, 
  // but can be returned by calling it
  let outerVariable = "I'm outside!"
  let pig = "oink"

  // function that will be returned which accesses the variables
  function innerFunction() {
    console.log(pig)
    console.log(outerVariable)
  }

  return innerFunction;
}


const myClosure = outerFunction()

myClosure();


function createCounter() {
  let count = 0;

  return function() {
    count += 1;
    return count;
  }
}


const counter = createCounter()


console.log(counter())
console.log(counter())
console.log(counter())
counter()
console.log(counter())

let stateVar = 0;

// metaprogramming along with closures to create state
// create a function that will have a enclosed function which
// performs the state operation in an encapsulated way
// without needing a function passed in so that the updates can
// be performed without accessing a new instance of that function
// when calling the outer function

function createStateVar() {
  function alterStateVar() {
    return stateVar++
  }

  return alterStateVar()
}


console.log(createStateVar())
console.log(createStateVar())



// function that creates a new function with the initial value of the state variable
// as well the ability to perform any of the functions peformed when accessing the state variables




class Page {
  constructor(state) {
    this.state = state
  }

  render() {

  }
}




