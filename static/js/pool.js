import Cue from "./cue.js"
import Ball from "./ball.js"

import { GAMECENTERX, GAMECENTERY, BALLPOSITIONS } from "./constants.js"

class Game {
  constructor() {
    this.cue = new Cue()
    this.ball = new Ball()
    this.gameCenter = {
      x: GAMECENTERX,
      y: GAMECENTERY,
    }
    this.ballInstances = []
    this.cueInstance = new Cue()
    this.state = 0
    this.whiteball = this.ballInstances[0]
    this.ballDistances = []
    this.interval = null
    this.renderItems = new Set()
  }



  get getState() {
    switch (this.state) {
      case 0:
        return "lining up"
      case 1:
        return "whiteball placed"
      case 2:
        return "winding up"
      default:
        return "undefined"
    }
  }


  Init() {
    for (let i = 0; i < BALLPOSITIONS.length; i++) {
      const ball = new Ball(i, BALLPOSITIONS[i].x, BALLPOSITIONS[i].y)
      ball.Init()
      this.ballInstances.push(ball)
    }
    for (let i = 0; i < BALLPOSITIONS.length; i++) {
      const distances = []
      for (let j = 0; j < BALLPOSITIONS.length; j++) {
        const deltaX = this.ballInstances[i].getPosition.x - this.ballInstances[j].getPosition.x
        const deltaY = this.ballInstances[i].getPosition.y - this.ballInstances[j].getPosition.y
        distances.push(Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2)))
      }
      this.ballDistances.push(distances)
    }
    this.renderItems.add(this.ballInstances[0])


    window.addEventListener("mousemove", (e) => {
      if (this.state === 0) {
        this.ballInstances[0].UserMoveWhiteball(e)
      }
      if (this.state === 1) {
        this.cueInstance.Rotate(e)
      }
    })
    window.addEventListener("click", () => {
      if (this.state === 0) {
        this.renderItems.delete(this.ballInstances[0])
        this.renderItems.add(this.cueInstance)
        this.state = 1
        const whiteBallPosition = this.ballInstances[0].getPosition
        this.cueInstance.PlaceBall(whiteBallPosition)
      }
    })
    window.addEventListener("pointerdown", () => {
      if (this.state === 1) {
        this.renderItems.add(this.ballInstances[0])
        this.cueInstance.WindUp()
        this.state = 2
      }
    })
    window.addEventListener("pointerup", () => {
      if (this.state === 2) {
        this.cueInstance.ClearWindup()
        this.cueInstance.Shoot()
      }
    })
    window.addEventListener("cueHit", (e) => {
      this.ballInstances[0].Hit(e.details.speed, e.details.angle)
    })
    window.addEventListener("ballmove", (e) => {
      this.#updateBallDistances(e)
    })

    this.interval = setInterval(() => {
      for (let item of this.renderItems.keys()) {
        item.render()
      }
    }, 1)
  }


  #updateBallDistances(e) {
    const newDistances = []
    const ballId = e.details.ballId
    for (let i = 0; i < this.ballInstances.length; i++) {
      if (ballId === i) {
        newDistances.push(this.ballDistances[i]);
        continue;
      }
      const deltaX = this.ballInstances[i].getPosition.x - this.ballInstances[ballId].getPosition.x
      const deltaY = this.ballInstances[i].getPosition.y - this.ballInstances[ballId].getPosition.y
      const distance = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2))
      const theta = Math.atan(deltaX / deltaY)
      const thetaDegrees = theta * (180 / Math.PI)
      console.log(thetaDegrees)
      if (distance < 20) {
        const theta = Math.atan(deltaX / deltaY)
        const speed = this.ballInstances[ballId].getSpeed
        this.ballInstances[i].Hit(speed, theta)
        this.renderItems.add(this.ballInstances[i])
        console.log("theta: ", theta, " speed: ", speed)
      }
      newDistances.push(distance)
    }
    this.ballDistances[ballId] = newDistances
  }
}



window.onload = function() {
  const game = new Game();
  game.Init()
}
