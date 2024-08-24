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
  }

  get stateStr() {
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
    console.log(this.ballDistances)
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
        this.state = 1
        const whiteBallPosition = this.ballInstances[0].getPosition
        this.cueInstance.PlaceBall(whiteBallPosition)
      }
    })
    window.addEventListener("pointerdown", () => {
      if (this.state === 1) {
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
      this.UpdateBallDistances(e)
    })
  }

  UpdateBallDistances(e) {
    const newDistances = []
    for (let i = 0; i < this.ballInstances.length; i++) {
      const ballId = e.details.ballId
      const deltaX = this.ballInstances[i].getPosition.x - this.ballInstances[ballId].getPosition.x
      const deltaY = this.ballInstances[i].getPosition.y - this.ballInstances[ballId].getPosition.y
      const distance = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2))
      if (distance < 20) {
        this.ballInstances[i].TurnPink()
        this.ballInstances[ballId].TurnPink()
      }
      newDistances.push(distance)
    }
    this.ballDistances[e.details.ballId] = newDistances
    console.log(this.ballDistances[e.details.ballId])
  }
}



window.onload = function() {
  const game = new Game();
  game.Init()
}
