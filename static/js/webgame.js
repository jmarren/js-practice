window.onload = function() {
  class Page {
    constructor(gameTitle) {
      this.gameTitle = gameTitle
      this.gameTitleElement = document.getElementById("game-title")
      this.gameCenter = {
        x: (500 / 2) + 8,
        y: (500 / 2) + 26,
      }
      this.arrowInstance = new this.ArrowClass(this.gameCenter)
      this.greenBall = new this.BallClass("green", 1)
      this.yellowBall = new this.BallClass("yellow", 2)
      this.blueBall = new this.BallClass("blue", 3)
      this.redBall = new this.BallClass("red", 4)
      this.state = 0
    }

    get stateString() {
      switch (this.state) {
        case 0:
          return "aiming"
        case 1:
          return "winding-up";
        case 2:
          return "shot"
        default:
          return "undefined state";
      }
    }

    BallClass = class {
      constructor(color, id) {
        this.position = {
          x: id,
          y: id,
        }
        this.color = color
        this.domElement = document.getElementById(`ball-${id}`)
        this.id = id
      }
      Init() {
        this.domElement.style.left = this.position.x
        this.domElement.style.top = this.position.y
        this.domElement.style.backgroundColor = this.color
      }

    }

    ArrowClass = class {
      constructor(gameCenter) {
        this.domElement = document.getElementById("arrow");
        this.theta = 0;
        this.position = {
          x: gameCenter.x - 10,
          y: gameCenter.y - 60,
        }
        this.windup = {
          elapsed: 0,
          speed: 0,
          interval: null,
        }
        this.shoot = {
          interval: null,
          elapsed: 0,
          speed: 0,
        }
        this.gameCenter = gameCenter
      }
      Init() {
        document.documentElement.style.setProperty("--arrow-x", `${this.position.x}`)
        document.documentElement.style.setProperty("--arrow-y", `${this.position.y}`)
      }
      Reset() {
        clearInterval(this.windup.interval)
        this.position = {
          x: this.gameCenter.x - 10,
          y: this.gameCenter.y - 60,
        }
        this.windup = {
          elapsed: 0,
          speed: 0,
          interval: null,
        }
        this.#render()
      }
      Spin(e) {
        const opp = e.clientX - this.gameCenter.x
        const adj = e.clientY - this.gameCenter.y
        this.theta = Math.atan2(adj, opp) + (Math.PI / 180) * 90
        this.#render()
      }
      WindUp() {
        this.windup.elapsed = this.windup.elapsed + 0.01
        this.windup.speed = 0.5 / (this.windup.elapsed * this.windup.elapsed + 1)
        console.log(this.windup.speed)
        const deltaX = this.windup.speed * Math.sin(this.theta)
        const deltaY = this.windup.speed * Math.cos(this.theta)
        this.position.x = this.position.x - deltaX
        this.position.y = this.position.y + deltaY
        this.#render()
      }
      Shoot() {
        this.shoot.elapsed = this.shoot.elapsed + 1
        this.shoot.speed = (5 * Math.pow(this.shoot.elapsed, 3)) / (Math.pow(this.shoot.elapsed, 3) + 1)
        if (this.position.x > 508) {
          this.theta = this.theta - Math.PI / 2
        }
        if (this.position.x < 8) {
          this.theta = this.theta + Math.PI / 2
        }
        if (this.position.y < 26) {
          this.theta = Math.PI - this.theta
        }
        if (this.position.y > 526) {
          this.theta = Math.PI + this.theta
        }
        const deltaX = this.shoot.speed * Math.sin(this.theta)
        const deltaY = this.shoot.speed * Math.cos(this.theta)
        this.position.x = this.position.x + deltaX
        this.position.y = this.position.y - deltaY
        console.log(this.position.x)

        this.#render()
      }
      #render() {
        document.documentElement.style.setProperty("--arrow-x", this.position.x)
        document.documentElement.style.setProperty("--arrow-y", this.position.y)
        document.documentElement.style.setProperty("--arrow-rotation", `${this.theta}rad`)
      }
    }

    init() {
      this.arrowInstance.Init()
      this.greenBall.Init()
      this.yellowBall.Init()
      this.blueBall.Init()
      this.redBall.Init()
      window.addEventListener("mousemove", (e) => {
        if (this.state == 0) {
          this.arrowInstance.Spin(e)
        }
      })
      window.addEventListener("pointerdown", () => {
        if (this.state == 0) {
          this.state = 1
          this.arrowInstance.windup.interval = setInterval(() => {
            this.arrowInstance.WindUp()
          }, 10)
        }
      })
      window.addEventListener("pointerup", () => {
        // this.arrowInstance.Reset()
        this.state = 2
        this.arrowInstance.shoot.interval = setInterval(() => {
          this.arrowInstance.Shoot()
        }, 1)
      })
    }
  }

  const myPage = new Page("a old game")
  myPage.init()
  console.log(myPage.stateString)
}


