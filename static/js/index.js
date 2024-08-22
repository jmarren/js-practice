

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


// String.isWellFormed() 
////// returns a boolean that indicates whether
////// the string contains any lone surrogates
////// (misplaced leading or trailing surrogates)

// The unicode escape sequence "\u" can be used to
// specifiy characters using their unicode code points directly

console.log("\u0041") // output: 'A'

console.log("\u0041".isWellFormed()) // output: true

console.log("\u0033\uD841") // output: 3�
console.log("\u0033\uD841".isWellFormed()) // output: false


// Side Note: It is possible to customize the appearance of console logs with CSS
console.log("%cThis is a styled message", "color: blue; font-size: 20px; background-color: yellow; padding: 5px; border-radius: 3px;");
console.error(" An ERROR happened! ahhhhhh!")

console.log("Meat.lastIndexOf('ic'):", Meat.lastIndexOf('ic'))

console.log("Meat.lastIndexOf('c'):", Meat.lastIndexOf('c'))

console.log("Meat.lastIndexOf('z'):", Meat.lastIndexOf('z'))

console.log("'abcde'.localeCompare('zyx'): ", 'abcde'.localeCompare('zyx')) // output: -1 because abcde is first
console.log("'zyx'.localeCompare('abcde'): ", 'zyx'.localeCompare('abcde')) // output: 1 because zyx is after

const emailRegex = /([A-Za-z\d]+@[A-Za-z\d]+.(com))/g
const myEmail = "johniscool@john.com is my email"
console.log(myEmail.match(emailRegex)) // output: ["johniscool@john.com"] 
console.log(emailRegex.test(myEmail)) // output: true

const ourEmails = "johniscool@john.com is my email and dummy@dumbo.com is your email"
console.log(ourEmails.match(emailRegex)) // output: ["johniscool@john.com"] 
console.log(emailRegex.test(ourEmails)) // output: true
const emailMatches = ourEmails.matchAll(emailRegex)
console.log([...emailMatches]) //
// emailMatches.next()
// console.log([...emailMatches])

// normalize()

const string1 = "\u00F1";
const string2 = "\u006E\u0303";

console.log(string1); // ñ
console.log(string2); // ñ

// There are two different ways to encode the same character
// this means string comparison will not treat them as equal

console.log(string1 === string2); // false

// they also will have differing lengths
console.log(string1.length); // 1
console.log(string2.length); // 2

// decomposed form ("NFD") will
// split any single code points into the two that represent
// the same character
string3 = string1.normalize("NFD")
string4 = string2.normalize("NFD")

console.log(string3); // ñ
console.log(string4); // ñ

console.log(string3 === string4); // true

// they also will have differing lengths
console.log(string3.length); // output: 2
console.log(string4.length); // output: 2

// will append the provided string to the end until it reaches the provided length
console.log("Meat.padEnd(20, '.'): ", Meat.padEnd(20, '.'))
console.log("Meat.padEnd(20, 'jk'): ", Meat.padEnd(20, 'jk'))
// same but pads the start of the string
console.log("Meat.padStart(20, '.'): ", Meat.padStart(20, '.'))


// String.prototype.repeat()
const fish = "salmon"
console.log(`I'd like some ${fish.repeat(3)}`)

// String.prototype.search()
// (from above) const emailRegex = /([A-Za-z\d]+@[A-Za-z\d]+.(com))/g
// returns the index of the first match to the regex
const someEmails = "this is not an email ! something@what.com thepizza@pasta.com"
console.log(someEmails.search(emailRegex)) // output: 23
console.log(someEmails.substring(23, 41)) // output: something@what.com


// String.prototype.startsWith()
// returns true if a string starts with provided searchString, false if not
const place = "moon";
const otherPlace = "the sun"
const soundACowMakes = "moo"
console.log(place.startsWith(otherPlace)) // false
console.log(place.startsWith(soundACowMakes)) // true

// String.prototype.substring() 
// returns part of the string from the start index until but exluding the end index
const book = "catcher in the rye"
const baseballPosition = book.substring(0, 7)
console.log(baseballPosition)







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
  #returnHotdog() {
    console.log("hotdog")
  }


  logHotdog() {
    this.#returnHotdog()
  }

  static returnClass() {
    console.log("Page")
  }

  clickButton() {
    let buttonClicked = false;
    this.#returnHotdog()
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


// Iterators

const numbers = [1, 2, 3];
const numbersIterator = numbers[Symbol.iterator]();

console.log(numbersIterator)

// console.log(numbersIterator.next())
// console.log(numbersIterator.next())
// console.log(numbersIterator.next())


let done = false

for (number of numbersIterator) {
  console.log("number: ", number)
}


const myMotto = "don't give up"

const myMottoIterator = myMotto[Symbol.iterator]()

for (letter of myMottoIterator) {
  console.log("letter:", letter)
}

const town = new String("Marrenville")

console.log("town.toLowerCase():", town.toLowerCase())

console.log(town)
// String.prototype.toString = () => "oopsie-daisy"

console.log(town.toString())
console.log(`${new String("fun times")}`);

//
// while (!done) {
//   let num = numbersIterator.next()
//   done = num.done
//   if (!done) {
//     console.log(num.value)
//   }
// }
//


//
// while (numbersIterator.next().done() == false) {
//   console.log(numbersIterator.next().value())
//   numbersIterator.next()
// }

// const activities = {
//   name: 
// }



// prototype of Date is Date.prototype
// prototype of Date.prototype is Object.prototype
// prototype of Object.prototype is null
const myDate = new Date();
let object = myDate;

do {
  object = Object.getPrototypeOf(object);
  console.log(object);
} while (object);
