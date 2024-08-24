import Cue from "./cue.js"
import Ball from "./ball.js"

import { GAMECENTERX, GAMECENTERY, BALLPOSITIONS, BALLRADIUS } from "./constants.js"

window.onload = function() {
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
      window.addEventListener("mousemove", (e) => {
        if (this.state === 0) {
          this.ballInstances[0].Move(e)
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
    }
  }



  const game = new Game();
  game.Init()
}
