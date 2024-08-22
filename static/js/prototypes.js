
// Objects can be created with a null prototype. However, the default
// methods provided by Object.prototype make working with all Objects
// much easier. (i.e. providing a .toString() method that will allow
// the object to be printed)

const nullPrototypeObject = Object.create(null)
console.log(nullPrototypeObject)


nullPrototypeObject.logANumber = () => {
  console.log(Math.random())
}

nullPrototypeObject.logANumber()

//// Defining a Constructor
function Person(name, age) {
  this.name = name
  this.age = age
}

Person.prototype.compareAge = function(age) {
  if (age == this.age) {
    return 0
  } else if (age > this.age) {
    return 1
  } else {
    return -1
  }
}

Person.staticProperty = () => {
  return "this is static"
}

console.log(Person.staticProperty())


const Jeff = new Person("Jeff", 57)
const Jimbo = new Person("Jimbo", 28)
const Kyle = new Person("Kyle", 57)

const comparison = Jeff.compareAge(Jimbo.age)
console.log(comparison)

const comparison2 = Jeff.compareAge(Kyle.age)
console.log(comparison2)

object = Jeff

function printProtoChain(object) {
  do {
    object = Object.getPrototypeOf(object);
    console.log(object);
  } while (object);
}

// const myObject = Object.create(null)


// function myObject(name) {
//   this.
// }


const clickHandler = () => {
  const inputElement = document.getElementById("my-name-input")
  console.log(inputElement.value)
  console.log("document: ", document)
  printProtoChain(document)
  document.body.append("hi")

  console.log(globalThis)
  console.log(window === globalThis)
  printProtoChain(window)
  // console.log(Object.getPrototypeOf(window))

  // const newDiv = document.body.appendChild("div")





  console.log("click")
}

// const submitButton = document.getElementById("submit-button")
//
// submitButton.addEventListener("click", listener) = () => {
//   // const inputElement = document.getElementById("jk")
//   console.log("click")
// }



// Object.prototype is the only object in JS that has immutable prototype: 
// its prototype is always null


// In order to use a Object.prototype method, it is better to use 
// .call() on the property than using the method directly to prevent overriding
// properties and leading to unexpected behaviors




