console.log("script working")

//  The String Object
const Meat = "chicken"

console.log("Meat.__proto__: ", Meat.__proto__)

console.log("// at()")

console.log("Meat.at(2): ", Meat.at(2))

console.log("// charAt()")

console.log("Meat.charAt(): ", Meat.charAt(2))

console.log("String.fromCharCode(189): ", String.fromCharCode(189))


// Will return only the first half of a surrogate pair (emojis/special symbols)
console.log("Meat.charCodeAt(2): ", Meat.charCodeAt(2))
// Will properly handle characters outside the Basic Multilingual Plane (meaning emojis/special symbols)
console.log("Meat.codePointAt(2): ", Meat.codePointAt(2))


console.log("Meat.concat(' ', 'tenders')", Meat.concat(' ', 'tenders'))

console.log("Meat.endsWith('at'): ", Meat.endsWith('at'))

console.log("Meat.endsWith('en'): ", Meat.endsWith('en'))

console.log("Meat.includes('ck'): ", Meat.includes('ck'))

console.log("Meat.indexOf('ck'): ", Meat.indexOf('ck'))
console.log("Meat.indexOf('cki'): ", Meat.indexOf('cki'))


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

/*
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

*/

class Page {
  constructor() {
    this.state = {
      buttonClicked: false,
    }
  }

  static returnClass() {
    console.log("Page")
  }

  clickButton() {
    let buttonClicked = false;

    return function() {
      buttonClicked = !buttonClicked
      return this.render({ ...this.state, buttonClicked: buttonClicked })
    }
  }

  clickaroo = this.clickButton()

  render(state) {
    let element = document.getElementById("click-me-button")
    if (state.buttonClicked) {
      element.style.backgroundColor = 'blue'
    } else {
      element.style.backgroundColor = "green"
    }
  }
}

const myPage = new Page()








