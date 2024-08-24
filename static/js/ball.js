import { BALLRADIUS, ballMove } from "./constants.js"
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
  TurnPink() {
    this.domElement.style.backgroundColor = "pink"
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
  UserMoveWhiteball(e) {
    this.position.x = e.clientX - BALLRADIUS
    this.position.y = e.clientY - BALLRADIUS
    ballMove.details = {
      ballId: 0
    }
    window.dispatchEvent(ballMove)
    this.#render()
  }
  Init() {
    this.domElement.style.left = `${this.position.x}px`
    this.domElement.style.top = `${this.position.y}px`
  }
  #render() {
    const newLeft = `${this.position.x}px`
    const newTop = `${this.position.y}px`
    if (this.domElement.style.left !== newLeft || this.domElement.style.top !== newTop) {
      this.domElement.style.left = newLeft
      this.domElement.style.top = newTop
      ballMove.details = {
        ballId: this.number
      }
      window.dispatchEvent(ballMove)
    }
  }
}


export default Ball
