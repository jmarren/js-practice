
const GAMEWIDTH = 500
const GAMEHEIGHT = 500
const MARGINLEFT = 8
const BALLDIAMETER = 20
const BALLRADIUS = BALLDIAMETER / 2
const MARGINTOP = 26
const CUEWIDTH = 10
const CUETIPWIDTH = CUEWIDTH / 2
const GAMECENTERX = (GAMEWIDTH / 2) + MARGINLEFT
const GAMECENTERY = (GAMEWIDTH / 2) + MARGINTOP
const TOPROWY = MARGINTOP + GAMEHEIGHT / 4
const BALLPOSITIONS = [
  { x: GAMECENTERX, y: GAMECENTERY },
  { x: GAMECENTERX, y: TOPROWY },
  { x: GAMECENTERX - BALLDIAMETER, y: TOPROWY },
  { x: GAMECENTERX + BALLDIAMETER, y: TOPROWY },
  { x: GAMECENTERX - (2 * BALLDIAMETER), y: TOPROWY },
  { x: GAMECENTERX + (2 * BALLDIAMETER), y: TOPROWY },
  { x: GAMECENTERX - (BALLDIAMETER / 2), y: TOPROWY + BALLDIAMETER * (0.88) },
  { x: GAMECENTERX + (BALLDIAMETER / 2), y: TOPROWY + BALLDIAMETER * (0.88) },
  { x: GAMECENTERX - (3 * BALLDIAMETER / 2), y: TOPROWY + BALLDIAMETER * (0.88) },
  { x: GAMECENTERX + (3 * BALLDIAMETER / 2), y: TOPROWY + BALLDIAMETER * (0.88) },
  { x: GAMECENTERX, y: TOPROWY + 2 * BALLDIAMETER * 0.88 },
  { x: GAMECENTERX - BALLDIAMETER, y: TOPROWY + 2 * (BALLDIAMETER * 0.88) },
  { x: GAMECENTERX + BALLDIAMETER, y: TOPROWY + 2 * (BALLDIAMETER * 0.88) },
  { x: GAMECENTERX - (BALLDIAMETER / 2), y: TOPROWY + 3 * BALLDIAMETER * (0.88) },
  { x: GAMECENTERX + (BALLDIAMETER / 2), y: TOPROWY + 3 * BALLDIAMETER * (0.88) },
  { x: GAMECENTERX, y: TOPROWY + 4 * BALLDIAMETER * 0.88 },
]
const cueHit = new Event("cueHit")


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

    get stateString() {
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
          this.cueInstance.windupInterval = setInterval(() => {
            this.cueInstance.WindUp()
          }, 10)
          this.state = 2
        }
      })
      window.addEventListener("pointerup", () => {
        if (this.state === 2) {
          console.log("up!")
          this.cueInstance.ClearWindup()
          this.cueInstance.Shoot()
        }
      })
      window.addEventListener("cueHit", (e) => {
        console.log(e)
        this.ballInstances[0].Hit(e.details.speed, e.details.angle)
      })
    }
  }

  class Cue {
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
      console.log("windupInterval: ", this.windupInterval)
      console.log("windup.interval: ", this.windup.interval)
      console.log("windup.elapsed: ", this.windup.elapsed)
      this.windup.elapsed += 1
      this.innerTransform.y = (1.2 * this.windup.elapsed - 1) / (0.01 * this.windup.elapsed + 1)
      this.#render()
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
      this.innerDomElement.style.animation = "shoot 0.2s ease-in-out"
      this.innerDomElement.style.animationFillMode = "forwards"
      setTimeout(() => {
        cueHit.details = {
          speed: this.innerTransform.y,
          angle: this.outerTransform.theta,
        }
        window.dispatchEvent(cueHit)
      }, 100)
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

  const game = new Game();
  game.Init()
}
