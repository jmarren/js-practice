import { BALLRADIUS } from "./constants.js"
class Ball {
  constructor(number, positionX, positionY) {
    this.number = number
    this.domElement = document.getElementById(`ball-${number}`)
    this.position = {
      x: positionX,
      y: positionY,
    }
    this.speed = 0

  }
  get getPosition() {
    return this.position
  }
  Hit(speed, angle) {
    this.speed = speed;
    this.theta = angle
    setInterval(() => {
      this.position.x = this.position.x + this.speed * Math.sin(this.theta)
      this.position.y = this.position.y - this.speed * Math.cos(this.theta)
      this.speed = Math.pow(this.speed, 0.97)
      this.#render()
    }, 10)
  }
  Move(e) {
    this.position.x = e.clientX - BALLRADIUS
    this.position.y = e.clientY - BALLRADIUS
    this.#render()
  }
  Init() {
    this.domElement.style.left = `${this.position.x}px`
    this.domElement.style.top = `${this.position.y}px`
  }
  #render() {
    this.domElement.style.left = `${this.position.x}px`
    this.domElement.style.top = `${this.position.y}px`
  }
}


export default Ball
