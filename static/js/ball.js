import { BALLRADIUS, ballMove } from "./constants.js"
class Ball {
  constructor(number, positionX, positionY) {
    this.number = number
    this.domElement = document.getElementById(`ball-${number}`)
    this.position = {
      x: positionX,
      y: positionY,
    }
    this.theta = 0
    this.speed = 0
  }

  get getPosition() {
    return this.position
  }
  get getSpeed() {
    return this.speed
  }
  TurnPink() {
    this.domElement.style.backgroundColor = "pink"
  }

  Hit(speed, angle) {
    this.speed = speed;
    this.theta = angle
  }
  UserMoveWhiteball(e) {
    this.position.x = e.clientX - BALLRADIUS
    this.position.y = e.clientY - BALLRADIUS
    this.render()
  }
  Init() {
    this.domElement.style.left = `${this.position.x}px`
    this.domElement.style.top = `${this.position.y}px`
  }
  render() {
    const deltaDistance = this.speed / 10
    this.position.x = this.position.x + deltaDistance * Math.sin(this.theta)
    this.position.y = this.position.y - deltaDistance * Math.cos(this.theta)
    this.speed = Math.pow(this.speed, 0.98)
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
