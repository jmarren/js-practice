import { cueHit, BALLRADIUS, BALLDIAMETER, CUETIPWIDTH } from "./constants.js"

export default class Cue {
  constructor() {
    this.outerDomElement = document.getElementById("cue-container")
    this.innerDomElement = document.getElementById("cue")

    this.position = {
      x: 0,
      y: 0,
    }
    this.outerTransform = {
      x: 0,
      y: 0,
      theta: 0,
    }
    this.innerTransform = {
      x: 0,
      y: 0,
    }
    this.windup = {
      elapsed: 0,
      interval: null,
    }
  }
  set windupInterval(interval) {
    this.windup.interval = interval
  }

  ClearWindup() {
    clearInterval(this.windup.interval)
  }
  PlaceBall(position) {
    this.position = {
      x: position.x,
      y: position.y,
    }
    this.outerDomElement.style.transformOrigin = `${(BALLRADIUS / 2)}px ${-1 * BALLDIAMETER + 5}px`
    this.outerTransform = {
      x: (BALLRADIUS / 2) - (CUETIPWIDTH / 4),
      y: BALLDIAMETER + 5,
      theta: 0,
    }

    this.#render()
  }
  Rotate(e) {
    const adjacent = e.clientY - this.position.y
    const opposite = e.clientX - this.position.x
    this.outerTransform.theta = -1 * Math.atan2(opposite, adjacent)
    this.#render()
  }

  WindUp() {
    this.windup.interval = setInterval(() => {
      // console.log("windupInterval: ", this.windupInterval)
      // console.log("windup.interval: ", this.windup.interval)
      // console.log("windup.elapsed: ", this.windup.elapsed)
      this.windup.elapsed += 1
      this.innerTransform.y = (1.2 * this.windup.elapsed - 1) / (0.01 * this.windup.elapsed + 1)
      this.#render()
    }, 10)
  }
  Shoot() {
    let shootKeyframe = document.createElement('style')
    shootKeyframe.innerHTML = `
@keyframes shoot {
    0% {
        transform: translateY(${this.innerTransform.y}px);
    }
    100% { 
transform: translateY(${-1 * this.innerTransform.y}px);
    }
  }
`
    document.head.appendChild(shootKeyframe)
    this.innerDomElement.style.animation = "shoot 0.3s ease-in-out"
    this.innerDomElement.style.animationFillMode = "forwards"
    setTimeout(() => {
      cueHit.details = {
        speed: this.innerTransform.y,
        angle: this.outerTransform.theta,
      }
      window.dispatchEvent(cueHit)
    }, 150)
  }

  Move(e) {
    this.position.x = e.clientX - BALLRADIUS
    this.position.y = e.clientY - BALLRADIUS
    this.#render()
  }
  #render() {
    this.outerDomElement.style.left = `${this.position.x}px`
    this.outerDomElement.style.top = `${this.position.y}px`
    this.outerDomElement.style.transform = `translateX(${this.outerTransform.x}px) translateY(${this.outerTransform.y}px) rotate(${this.outerTransform.theta}rad) `
    this.innerDomElement.style.transform = `translateY(${this.innerTransform.y}px)`
  }

}
