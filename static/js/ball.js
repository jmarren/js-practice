import { BALLRADIUS, MARGINTOP, MARGINLEFT, GAMEWIDTH, GAMEHEIGHT, ballMove } from "./constants.js"
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
  //
  HitWall(wall) {
    switch (wall) {
      case "TOP":
        this.theta = Math.PI - this.theta;
        break;
      case "BOTTOM":
        this.theta = Math.PI - this.theta;
        break;
      case "LEFT":
        this.theta = -1 * this.theta;
        break;
      case "RIGHT":
        this.theta = -1 * this.theta;
        break;
      default:
        return;
    }
  }

  Hit(speed, angle) {
    this.speed = speed;
    this.theta = angle;
    console.log("angle:", (180 / Math.PI) * angle);
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
    if (this.speed >= 0.05) {
      this.speed = this.speed - 0.3;
    } else {
      this.speed = 0;
    }

    if (this.position.y <= MARGINTOP) this.HitWall("TOP");
    if (this.position.y >= GAMEHEIGHT) this.HitWall("BOTTOM");
    if (this.position.x <= MARGINLEFT) this.HitWall("LEFT");
    if (this.position.x >= GAMEWIDTH) this.HitWall("RIGHT");
    // this.speed = Math.pow(this.speed, 0.98)
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
